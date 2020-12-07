TRUNCATE folders RESTART IDENTITY cascade;

INSERT INTO folders (folder_id, name)
VALUES
    (1, 'Cool Folder'),
    (2, 'Dumb Folder'),
    (3, 'Smart Stuff'),
    (4, 'Ethereum');
