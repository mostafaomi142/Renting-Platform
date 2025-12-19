-- Run this SQL command to update your database schema
-- This renames the 'photo' column to 'photoUrl' in the product table

ALTER TABLE product CHANGE COLUMN photo photoUrl VARCHAR(500);
