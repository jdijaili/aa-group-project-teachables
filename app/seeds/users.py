from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    knittywitty = User(
        username='knittywitty', email='knittywitty@aa.io', password='password')
    purlsofwisdom = User(
        username='purlsofwisdom', email='purlsofwisdom@aa.io', password='password')
    knithappens = User(
        username='knithappens', email='knithappens@aa.io', password='password')
    stitchcraft = User(
        username='stitchcraft', email='stitchcraft@aa.io', password='password')
    comingunraveled = User(
        username='comingunraveled', email='comingunraveled@aa.io', password='password')
    needforbead = User(
        username='needforbead', email='needforbead@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(knittywitty)
    db.session.add(purlsofwisdom)
    db.session.add(knithappens)
    db.session.add(stitchcraft)
    db.session.add(comingunraveled)
    db.session.addd(needforbead)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
