'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ForumPost, ForumComment, ForumUser } from '@/types';
import { currentUser, forumPosts, forumComments } from '@/data/forum';
import { localAI } from '@/lib/mcp-services';

interface ForumContextType {
  currentUser: ForumUser;
  isLoggedIn: boolean;
  posts: ForumPost[];
  comments: ForumComment[];
  login: (username: string) => void;
  logout: () => void;
  createPost: (post: Omit<ForumPost, 'id' | 'userId' | 'username' | 'userAvatar' | 'timestamp' | 'upvotes' | 'downvotes' | 'commentCount'>) => Promise<ForumPost>;
  createComment: (comment: Omit<ForumComment, 'id' | 'userId' | 'username' | 'userAvatar' | 'timestamp' | 'upvotes' | 'downvotes'>) => Promise<ForumComment>;
  upvotePost: (postId: string) => void;
  downvotePost: (postId: string) => void;
  upvoteComment: (commentId: string) => void;
  downvoteComment: (commentId: string) => void;
  generateAISummary: (content: string) => Promise<string>;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ForumUser>(currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulated login state
  const [posts, setPosts] = useState<ForumPost[]>(forumPosts);
  const [comments, setComments] = useState<ForumComment[]>(forumComments);

  // Load forum data from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('alkadami-forum-posts');
    const savedComments = localStorage.getItem('alkadami-forum-comments');
    
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        // Convert timestamp strings back to Date objects
        const postsWithDates = parsedPosts.map((post: ForumPost) => ({
          ...post,
          timestamp: new Date(post.timestamp)
        }));
        setPosts(postsWithDates);
      } catch (error) {
        console.error('Error loading posts from localStorage:', error);
      }
    }
    
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        const commentsWithDates = parsedComments.map((comment: ForumComment) => ({
          ...comment,
          timestamp: new Date(comment.timestamp)
        }));
        setComments(commentsWithDates);
      } catch (error) {
        console.error('Error loading comments from localStorage:', error);
      }
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('alkadami-forum-posts', JSON.stringify(posts));
  }, [posts]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('alkadami-forum-comments', JSON.stringify(comments));
  }, [comments]);

  const login = (username: string) => {
    // Simulated login - in real app would authenticate
    setUser({ ...user, username });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const createPost = async (postData: Omit<ForumPost, 'id' | 'userId' | 'username' | 'userAvatar' | 'timestamp' | 'upvotes' | 'downvotes' | 'commentCount'>): Promise<ForumPost> => {
    // Generate AI summary for the post
    let aiSummary = '';
    try {
      aiSummary = await localAI.summarize(postData.content, 'tl;dr');
    } catch (error) {
      console.error('Error generating AI summary:', error);
      // Fallback summary
      aiSummary = postData.content.substring(0, 150) + '...';
    }

    const newPost: ForumPost = {
      ...postData,
      id: `post-${Date.now()}`,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      aiSummary
    };

    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const createComment = async (commentData: Omit<ForumComment, 'id' | 'userId' | 'username' | 'userAvatar' | 'timestamp' | 'upvotes' | 'downvotes'>): Promise<ForumComment> => {
    const newComment: ForumComment = {
      ...commentData,
      id: `comment-${Date.now()}`,
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0
    };

    setComments(prev => [...prev, newComment]);

    // Update comment count on post
    setPosts(prev => prev.map(post => 
      post.id === commentData.postId 
        ? { ...post, commentCount: post.commentCount + 1 }
        : post
    ));

    return newComment;
  };

  const upvotePost = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, upvotes: post.upvotes + 1 }
        : post
    ));
  };

  const downvotePost = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, downvotes: post.downvotes + 1 }
        : post
    ));
  };

  const upvoteComment = (commentId: string) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, upvotes: comment.upvotes + 1 }
        : comment
    ));
  };

  const downvoteComment = (commentId: string) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, downvotes: comment.downvotes + 1 }
        : comment
    ));
  };

  const generateAISummary = async (content: string): Promise<string> => {
    try {
      const summary = await localAI.summarize(content, 'key-points');
      return summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      return content.substring(0, 200) + '...';
    }
  };

  return (
    <ForumContext.Provider
      value={{
        currentUser: user,
        isLoggedIn,
        posts,
        comments,
        login,
        logout,
        createPost,
        createComment,
        upvotePost,
        downvotePost,
        upvoteComment,
        downvoteComment,
        generateAISummary
      }}
    >
      {children}
    </ForumContext.Provider>
  );
}

export function useForum() {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
}
