/*
  # Create wishes table for birthday messages

  1. New Tables
    - `wishes`
      - `id` (uuid, primary key) - Unique identifier for each wish
      - `message` (text) - The birthday wish message content
      - `created_at` (timestamptz) - Timestamp when the wish was created

  2. Security
    - Enable RLS on `wishes` table
    - Add policy for anyone to read wishes (public celebration)
    - Add policy for anyone to insert wishes (allow guests to submit)

  3. Notes
    - This table stores birthday wishes submitted by visitors
    - Public read/write access is intentional for this celebration page
    - Messages are sanitized on the frontend before display
*/

CREATE TABLE IF NOT EXISTS wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wishes"
  ON wishes
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert wishes"
  ON wishes
  FOR INSERT
  WITH CHECK (true);
