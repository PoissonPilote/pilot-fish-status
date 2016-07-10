create type boat as enum ('boat-1', 'boat-2', 'sub');

alter table position add column boat boat;
update position set boat = 'boat-1'::boat;
alter table position alter boat set not null;
