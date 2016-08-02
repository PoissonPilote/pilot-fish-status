alter table position alter point drop not null;
alter table position alter depth drop not null;

create table data (
    datum_id uuid primary key,
    raw_data json,
    paddle decimal,
    oxygen decimal,
    datetime timestamptz not null
);
