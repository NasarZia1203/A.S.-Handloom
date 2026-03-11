-- Fix placeholder image URLs to use real Cloudinary cloud name
-- Run this in Supabase SQL Editor

UPDATE public.products SET image_url = replace(image_url, 'res.cloudinary.com/placeholder', 'res.cloudinary.com/dtmyjqrdv');
