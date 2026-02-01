-- Seed data for testing Agegator
-- Run this in Supabase SQL Editor after creating the schema

-- Create test users (admin + some test athletes)
-- Note: These are test users. In production, use actual auth accounts.

-- Sample test athlete data - High School Sports
INSERT INTO public.athlete_profiles (user_id, name, age, city, country, sport, position, level, height, weight, graduation_year, bio, is_verified)
VALUES
  -- High School Football
  ('550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', 16, 'New York', 'USA', 'American Football', 'Quarterback', 'high_school', '6\'1"', '200', 2025, 'Top QB prospect in NY. State champion 2024.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440002', 'Marcus Williams', 17, 'New York', 'USA', 'American Football', 'Running Back', 'high_school', '5''11"', '210', 2024, 'Fast and agile RB with great vision.', FALSE),
  
  -- High School Basketball
  ('550e8400-e29b-41d4-a716-446655440003', 'LeBron Smith', 16, 'Los Angeles', 'USA', 'Basketball', 'Point Guard', 'high_school', '6''2"', '185', 2025, 'Elite ball handler, 3-time All-State.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440004', 'Zion Davis', 17, 'Los Angeles', 'USA', 'Basketball', 'Center', 'high_school', '6''10"', '235', 2024, 'Dominant inside presence.', FALSE),
  
  -- High School Soccer
  ('550e8400-e29b-41d4-a716-446655440005', 'Sofia García', 15, 'Miami', 'USA', 'Soccer', 'Forward', 'high_school', '5''9"', '130', 2026, 'Lead scorer for Florida State club team.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440006', 'Emma Johnson', 16, 'Miami', 'USA', 'Soccer', 'Midfielder', 'high_school', '5''7"', '125', 2025, 'Great vision and passing accuracy.', FALSE),
  
  -- High School Volleyball
  ('550e8400-e29b-41d4-a716-446655440007', 'Jessica Wong', 17, 'San Francisco', 'USA', 'Volleyball', 'Middle Blocker', 'high_school', '6''0"', '160', 2024, 'Outstanding vertical jump and blocking.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440008', 'Olivia Chen', 16, 'San Francisco', 'USA', 'Volleyball', 'Setter', 'high_school', '5''11"', '145', 2025, 'Precision setter with great court sense.', FALSE),
  
  -- High School Baseball
  ('550e8400-e29b-41d4-a716-446655440009', 'Chris Anderson', 17, 'Boston', 'USA', 'Baseball', 'Pitcher', 'high_school', '6''3"', '195', 2024, '95+ mph fastball, scouts watching.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440010', 'Tyler Roberts', 16, 'Boston', 'USA', 'Baseball', 'Outfielder', 'high_school', '6''0"', '185', 2025, 'Excellent range and arm strength.', FALSE),
  
  -- High School Track & Field
  ('550e8400-e29b-41d4-a716-446655440011', 'Usain Brown', 17, 'Atlanta', 'USA', 'Track & Field', NULL, 'high_school', '6''0"', '160', 2024, '400m specialist, state record holder.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440012', 'Alicia Thompson', 16, 'Atlanta', 'USA', 'Track & Field', NULL, 'high_school', '5''8"', '135', 2025, 'Distance runner, consistent performer.', FALSE),
  
  -- High School Swimming
  ('550e8400-e29b-41d4-a716-446655440013', 'Michael Phelps', 17, 'Phoenix', 'USA', 'Swimming & Diving', NULL, 'high_school', '6''2"', '190', 2024, 'Freestyle and butterfly champion.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440014', 'Sarah Mitchell', 16, 'Phoenix', 'USA', 'Swimming & Diving', NULL, 'high_school', '5''10"', '140', 2025, 'Fast backstroke swimmer.', FALSE),
  
  -- High School Lacrosse
  ('550e8400-e29b-41d4-a716-446655440015', 'Connor Walsh', 17, 'Boston', 'USA', 'Lacrosse', 'Attack', 'high_school', '6''0"', '200', 2024, 'Lethal shot, high-level club play.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440016', 'Kelsey Hart', 16, 'Boston', 'USA', 'Lacrosse', 'Midfielder', 'high_school', '5''10"', '150', 2025, 'Fast and agile midfielder.', FALSE),

-- College Level Athletes
  -- College Football
  ('550e8400-e29b-41d4-a716-446655440017', 'Patrick Mahomes II', 19, 'Austin', 'USA', 'American Football', 'Quarterback', 'college', '6''2"', '210', 2022, 'Starting QB for UT Longhorns, draft prospect.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440018', 'Jamarr Chase', 20, 'New Orleans', 'USA', 'American Football', 'Wide Receiver', 'college', '6''1"', '200', 2021, 'All-American WR for LSU.', FALSE),
  
  -- College Basketball
  ('550e8400-e29b-41d4-a716-446655440019', 'Jayson Tatum', 21, 'Durham', 'USA', 'Basketball', 'Small Forward', 'college', '6''9"', '210', 2020, 'Duke superstar, NBA ready.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440020', 'Zion Williamson', 20, 'New Orleans', 'USA', 'Basketball', 'Power Forward', 'college', '6''7"', '285', 2021, 'Elite athlete, NBA potential.', FALSE),
  
  -- College Soccer
  ('550e8400-e29b-41d4-a716-446655440021', 'Mia Hamm', 19, 'Chapel Hill', 'USA', 'Soccer', 'Forward', 'college', '5''8"', '128', 2023, 'UNC star striker, Olympic contender.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440022', 'Carli Lloyd', 20, 'Santa Clara', 'USA', 'Soccer', 'Midfielder', 'college', '5''7"', '130', 2022, 'SCU midfielder, strong passer.', FALSE),
  
  -- College Volleyball
  ('550e8400-e29b-41d4-a716-446655440023', 'Misty May-Treanor', 21, 'Lincoln', 'USA', 'Volleyball', 'Middle Blocker', 'college', '6''2"', '180', 2020, 'Nebraska legend, NCAA champ.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440024', 'Ali Krieger', 20, 'Gainesville', 'USA', 'Volleyball', 'Libero', 'college', '5''9"', '150', 2021, 'Florida Gators defensive star.', FALSE),
  
  -- College Baseball
  ('550e8400-e29b-41d4-a716-446655440025', 'Mike Trout', 21, 'Baton Rouge', 'USA', 'Baseball', 'Outfielder', 'college', '6''2"', '235', 2020, 'LSU outfielder, pro prospect.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440026', 'Clayton Kershaw', 22, 'Dallas', 'USA', 'Baseball', 'Pitcher', 'college', '6''3"', '225', 2019, 'Baylor ace, major league potential.', FALSE),
  
  -- College Swimming
  ('550e8400-e29b-41d4-a716-446655440027', 'Katie Ledecky', 20, 'Palo Alto', 'USA', 'Swimming & Diving', NULL, 'college', '6''0"', '160', 2021, 'Stanford swimmer, Olympic gold.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440028', 'Nathan Adrian', 21, 'Berkeley', 'USA', 'Swimming & Diving', NULL, 'college', '6''3"', '195', 2020, 'Cal swimmer, NCAA champion.', FALSE),

-- Academy Level Athletes
  ('550e8400-e29b-41d4-a716-446655440029', 'Hansi Flick Jr', 18, 'Berlin', 'Germany', 'Soccer', 'Forward', 'academy', '5''11"', '165', 2024, 'Bayern Munich academy prospect.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440030', 'Mateo Kovacic', 19, 'Madrid', 'Spain', 'Soccer', 'Midfielder', 'academy', '5''8"', '160', 2023, 'Real Madrid youth academy.', FALSE),
  
-- Semi-Pro Athletes
  ('550e8400-e29b-41d4-a716-446655440031', 'Jake Morrison', 24, 'Portland', 'USA', 'Soccer', 'Striker', 'semi_pro', '5''11"', '185', 2019, 'Portland Timbers 2 player.', TRUE),
  ('550e8400-e29b-41d4-a716-446655440032', 'Marcus Washington', 23, 'Detroit', 'USA', 'American Football', 'Linebacker', 'semi_pro', '6''2"', '240', 2019, 'Indoor football league player.', FALSE);
