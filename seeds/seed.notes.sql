TRUNCATE notes RESTART IDENTITY cascade;

INSERT INTO notes (note_id, name, content, folder_id)
VALUES
    (1, 'Note Title', 'A really cool note', 1),
    (2, 'Worms', 'Crawly', 2),
    (3, 'Birds', 'They fly', 1),
    (4, 'Blockchain', 'I love blockchain', 4),
    (5, 'Football', 'NFL', 3),
    (6, 'Airplanes', 'they fly', 3),
    (7, 'Apple', 'they make phones', 1),
    (8, 'Beans', 'They make you fart', 2),
    (9, 'Jury duty', 'A tradition', 3),
    (10, 'NHL hockey', 'get paid to fight on skates', 1),
    (11, 'Mac', 'Apple product', 3),
    (12, 'Dumb note', 'This not is dumb', 2);
