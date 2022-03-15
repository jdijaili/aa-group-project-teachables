from app.models import db, Comment

def seed_comments():
    a = Comment(author_id=1, project_id=1, step_id=33, reply=None, type="type", content="very helpful, thanks!")
    b = Comment(author_id=1, project_id=2, step_id=None, reply=None, type="type", content="great work, thanks!")
    c = Comment(author_id=1, project_id=3, step_id=None, reply=None, type="type", content="useless walkthorugh")
    d = Comment(author_id=2, project_id=4, step_id=None, reply=None, type="type", content="first!")
    e = Comment(author_id=2, project_id=5, step_id=None, reply=None, type="type", content="very helpful, thanks!")
    f = Comment(author_id=1, project_id=6, step_id=None, reply=None, type="type", content="comment")
    g = Comment(author_id=1, project_id=6, step_id=None, reply=None, type="type", content="anyone else try this?")
    h = Comment(author_id=4, project_id=7, step_id=None, reply=None, type="type", content="very helpful, thanks!")
    i = Comment(author_id=4, project_id=12, step_id=None, reply=None, type="type", content="insightful")
    j = Comment(author_id=7, project_id=16, step_id=None, reply=None, type="type", content="got it to work!")
    k = Comment(author_id=8, project_id=13, step_id=None, reply=None, type="type", content="very helpful, thanks!")

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)
    db.session.add(e)
    db.session.add(f)
    db.session.add(g)
    db.session.add(h)
    db.session.add(i)
    db.session.add(j)
    db.session.add(k)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
