TRUNCATE folders RESTART IDENTITY cascade;

INSERT INTO folders (id, name)
VALUES
    (1, 'Cool Folder'),
    (2, 'Dumb Folder'),
    (3, 'Smart Stuff'),
    (4, 'Ethereum');

  
SELECT setval('folders_id_seq', 4, true);
