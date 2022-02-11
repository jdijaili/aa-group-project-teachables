from flask.cli import AppGroup
from .categories import seed_categories, undo_categories
from .projects import seed_projects, undo_projects
from .steps import seed_steps, undo_steps
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .projects import seed_projects, undo_projects
from .steps import seed_steps, undo_steps
from .comments import seed_comments, undo_comments


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_categories()
    seed_users()
    seed_projects()
    seed_steps()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_categories()
    undo_users()
    undo_projects()
    undo_steps()
    undo_comments()
    # Add other undo functions here
