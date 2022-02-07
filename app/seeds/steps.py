from app.models import db, Step
from app.aws import upload_file_to_s3

step1 = upload_file_to_s3()['url']

def seed_steps():
    QG1 = Step(
        project_id = 1, step_number = 1, title = 'White PLays 1. d4', description = 'White PLays 1. d4', image = ''
    )
    QG2 = Step(
        project_id = 1, step_number = 2, title = 'Black PLays 2. d5', description = 'Black PLays 2. d5', image = ''
    )
    QG3 = Step(
        project_id = 1, step_number = 3, title = 'White PLays 3. c4', description = 'White PLays 3. c4', image = ''
    )
  