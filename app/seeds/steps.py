from app.models import db, Step
# from app.images.Chess import QG, QGA, QGD, Italian, RuyLopez
# from app.aws import upload_file_to_s3

# step1 = upload_file_to_s3()['url']

def seed_steps():
    QG1 = Step(
        project_id = 1, step_number = 1, title = 'White PLays 1. d4', description = 'White PLays 1. d4', image = 'app/images/Chess/QG/QG1.png')
    QG2 = Step(
        project_id = 1, step_number = 2, title = 'Black PLays 2. d5', description = 'Black PLays 2. d5', image = 'app/images/Chess/QG/QG2.png')
    QG3 = Step(
        project_id = 1, step_number = 3, title = 'White PLays 3. c4', description = 'White PLays 3. c4', image = 'app/images/Chess/QG/QG3.png')

    db.session.add(QG1)
    db.session.add(QG2)
    db.session.add(QG3)

    db.session.commit()

def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()



  