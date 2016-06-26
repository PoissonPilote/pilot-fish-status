create table position (
    position_id uuid primary key,
    point point not null,
    depth decimal not null,
    datetime timestamptz not null
);
