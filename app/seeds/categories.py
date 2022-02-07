from app.models import db, Category

def seed_categories():
    chess = Category(
        name='Chess Openings', description='Chess Openings Explorer', image='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Lichess_Logo.svg/1200px-Lichess_Logo.svg.png')
    knitting = Category(
        name='Knitting', description='Knitting Instructions', image='blank')
    code = Category(
        name='Coding', description='Installation Instructions', image='blank')
    jewelry = Category(
        name='jewelry', description='jewelry', image='blank')

    db.session.add(chess)
    db.session.add(knitting)
    db.session.add(code)
    db.session.add(jewelry)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
