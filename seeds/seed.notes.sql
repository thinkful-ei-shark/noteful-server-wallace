TRUNCATE notes RESTART IDENTITY cascade;

INSERT INTO notes (id, title, content, date, folder_id)
VALUES
    (1, 'Note Title', 'A really cool note', '2021-01-01', 1),
    (2, 'Worms', 'Crawly', '2021-01-01', 2),
    (3, 'Birds', 'They fly', '2021-01-01', 3),
    (4, 'Blockchain', 'I love blockchain', '2021-01-01', 3),
    (5, 'Football', 'NFL', '2021-01-01', 4),
    (6, 'Airplanes', 'they fly', '2021-01-01', 2),
    (7, 'Apple', 'they make phones', '2021-01-01', 2),
    (8, 'Beans', 'They make you fart', '2021-01-01', 3),
    (9, 'Jury duty', 'A tradition', '2021-01-01', 1),
    (10, 'NHL hockey', 'get paid to fight on skates', '2021-01-01', 3),
    (11, 'Mac', 'Apple product', '2021-01-01', 1),
    (12, 'Dumb note', 'This not is dumb', '2021-01-01', 3);

SELECT setval('notes_id_seq', 12, true);
