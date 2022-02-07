from app.models import db, Project

def seed_projects():
    QueensGambit = Project(
        user_id = 1, title = 'Queen\'s Gambit', description = 'White immediately responds to Black\'s attempt to gain a foothold in the center by striking out with their c-pawn. Though this pawn is not defended and Black can capture it with ... dxc4, doing so will remove Black\'s d-pawn from the center and give White more opportunities for central control. Therefore, Black often chooses to decline the gambit, which he can do in several ways.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None)
    QueensGambitAccepted = Project(
        user_id = 1, title = 'Queen\'s Gambit Accepted', description = 'The Queen\'s Gambit Accepted has a rich heritage in chess, both sides played by many of the world champions through the years. It is not really much of a gambit since white can recover the pawn immediately with 3. Qa4+, though unless white wants the queen placed on c4, this is unnecessary.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None)
    QueensGambitDeclined = Project(
        user_id = 1, title = 'Queen\'s Gambit Declined', description = 'With 2...e6, Black declines the Queen\'s Gambit in the traditional fashion. 2...e6 bolsters the d5 pawn and opens a diagonal for the development of Black\'s dark-squared bishop. However, 2...e6 also blocks the c8-h3 diagonal for Black\'s light-squared bishop. Finding a way to productively develop this piece is a perennial challenge for Black players in the QGD.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None)
    Italian = Project(
        user_id = 1, title = 'The Italian Game', description = 'And so we reach the Italian Game. White takes aim at Black\'s weak f7 pawn. Now there are a number of options for Black. This opening is more reserved than the Ruy Lopez.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None)
    RuyLopez = Project(
        user_id = 1, title = 'The Ruy Lopez', description = 'The essential move marking the Ruy Lopez, or Spanish Game. "It is the double king\'s pawn opening most commonly used in master play; it has been adopted by almost all players at some point in their careers and many play it from both the White and Black sides. White threatens to trade off Black\'s c6-knight, leaving the e5-pawn undefended. It\'s not an immediate threat, because after 4. Bxc6 dxc6 5. Nxe5, Black can win the pawn back with 5... Qd4 or 5... Qg5. Black can respond in a variety of ways. The most common move is the Morphy Defence 3... a6. This forces White to make a decision about the Bishop - retreat or exchange. Many other moves are available, some neglecting completely the protection of the knight and the pawn and continuing development. The opening is named after the 16th century Spanish priest Ruy López de Segura.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None)


    db.session.add(QueensGambit)
    db.session.add(QueensGambitAccepted)
    db.session.add(QueensGambitDeclined)
    db.session.add(Italian)
    db.session.add(RuyLopez)

    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()