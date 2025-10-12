/*
  # Create celebration state table

  1. New Tables
    - `celebration_state`
      - `id` (integer, primary key) - Fixed ID (always 1) for singleton state
      - `celebration_triggered` (boolean) - Whether celebration has been triggered
      - `triggered_at` (timestamptz) - When the celebration was first triggered
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `celebration_state` table
    - Add policy for anyone to read the state (needed to check if celebration should show)
    - Add policy for anyone to update the state (allows triggering celebration)

  3. Notes
    - This table uses a singleton pattern (only one row with id=1)
    - Stores persistent state of whether the birthday celebration has been triggered
    - Once triggered, the celebration will always show on page load
    - Public read/write access is intentional for this celebration page
*/

CREATE TABLE IF NOT EXISTS celebration_state (
  id integer PRIMARY KEY DEFAULT 1,
  celebration_triggered boolean DEFAULT false NOT NULL,
  triggered_at timestamptz,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT singleton_check CHECK (id = 1)
);

ALTER TABLE celebration_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read celebration state"
  ON celebration_state
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update celebration state"
  ON celebration_state
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert celebration state"
  ON celebration_state
  FOR INSERT
  WITH CHECK (id = 1);

INSERT INTO celebration_state (id, celebration_triggered, triggered_at, updated_at)
VALUES (1, false, NULL, now())
ON CONFLICT (id) DO NOTHING;
