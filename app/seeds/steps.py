from app.models import db, Step

def seed_steps():

    db.session.add(Step(project_id = 1, step_number = 1, title = 'White PLays 1. d4', description = 'White PLays 1. d4', image = 'app/images/Chess/QG/QG1.png'))
    db.session.add(Step(project_id = 1, step_number = 2, title = 'Black PLays 2. d5', description = 'Black PLays 2. d5', image = 'app/images/Chess/QG/QG2.png'))
    db.session.add(Step(project_id = 1, step_number = 3, title = 'White PLays 3. c4', description = 'White PLays 3. c4', image = 'app/images/Chess/QG/QG3.png'))
    db.session.add(Step(project_id = 2, step_number = 1, title = 'White PLays 1. d4', description = 'White PLays 1. d4', image = 'app/images/Chess/QG/QG1.png'))
    db.session.add(Step(project_id = 2, step_number = 2, title = 'Black PLays 2. d5', description = 'Black PLays 2. d5', image = 'app/images/Chess/QG/QG2.png'))
    db.session.add(Step(project_id = 2, step_number = 3, title = 'White PLays 3. c4', description = 'White PLays 3. c4', image = 'app/images/Chess/QG/QG3.png'))
    db.session.add(Step(project_id = 2, step_number = 4, title = 'Black plays 4. dxc4', description = 'Black plays 4. dxc4', image = 'w20-teachables-group-project/app/images/Chess/QGA/QGA4.png'))
    db.session.add(Step(project_id = 3, step_number = 1, title = 'White PLays 1. d4', description = 'White PLays 1. d4', image = 'app/images/Chess/QG/QG1.png'))
    db.session.add(Step(project_id = 3, step_number = 2, title = 'Black PLays 2. d5', description = 'Black PLays 2. d5', image = 'app/images/Chess/QG/QG2.png'))
    db.session.add(Step(project_id = 3, step_number = 3, title = 'White PLays 3. c4', description = 'White PLays 3. c4', image = 'app/images/Chess/QG/QG3.png'))
    db.session.add(Step(project_id = 3, step_number = 4, title = 'Black plays 4. e3', description = 'Black plays 4. e3', image = 'w20-teachables-group-project/app/images/Chess/QGD/QGD4.png'))
    db.session.add(Step(project_id = 4, step_number = 1, title = 'White plays 1. e4', description = 'White plays 1. e4', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA1.png'))
    db.session.add(Step(project_id = 4, step_number = 2, title = 'Black plays 2. e5', description = 'Black plays 2. e5', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA2.png'))
    db.session.add(Step(project_id = 4, step_number = 3, title = 'White plays 3. nf3', description = 'White plays 3. nf3', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA3.png'))
    db.session.add(Step(project_id = 4, step_number = 4, title = 'Black plays 4. nc6', description = 'Black plays 4. nc6', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA4.png'))
    db.session.add(Step(project_id = 4, step_number = 5, title = 'White plays 5. bc4', description = 'White plays 5. bc4', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA5.png'))
    db.session.add(Step(project_id = 5, step_number = 1, title = 'White plays 1. e4', description = 'White plays 1. e4', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA1.png'))
    db.session.add(Step(project_id = 5, step_number = 2, title = 'Black plays 2. e5', description = 'Black plays 2. e5', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA2.png'))
    db.session.add(Step(project_id = 5, step_number = 3, title = 'White plays 3. nf3', description = 'White plays 3. nf3', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA3.png'))
    db.session.add(Step(project_id = 5, step_number = 4, title = 'Black plays 4. nc6', description = 'Black plays 4. nc6', image = 'w20-teachables-group-project/app/images/Chess/Italian/ITA4.png'))
    db.session.add(Step(project_id = 5, step_number = 5, title = 'White plays 5. bb5', description = 'White plays 5. bb5', image = 'w20-teachables-group-project/app/images/Chess/RuyLopez/RL5.png'))




    db.session.add(Step(project_id=6, step_number=1, title="Code Explanation", description="The hashing function handled nearly all of the previously mentioned concerns, but had two wrinkles to take care of.\n\nFirst, when interpreting the result of the hash as a number, JavaScripts default number type did not have enough accuracy to represent the result completely. This resulted in the last several digits on the table always being set to 0. To address this, I split the result into several string segments, then joined them back together after interpreting them into the desired encoding base.\n\nThe second issue was more of a self-imposed constraint. In order to mitigate some of the bias in reading the table with arbitrary ranges, I decided I wanted to encode the random number table in base 12 because it was a local high point for divisibility with other numbers. This meant converting from sha256's base 64 results into base 10, which could then be converted into base 12 since JavaScripts base conversion isn't arbitrary.", image="images/project-rnTable/table-code.png"))
    db.session.add(Step(project_id=7, step_number=1, title="Is it balanced?", description="If yes, you're done. If no, continue to Step 2.\nIf this is your (large number)th time here or later, consider changing the mechanic entirely.", image=""))
    db.session.add(Step(project_id=7, step_number=2, title="Is the number too big or too small?", description="If too big, halve the difference from the last value. If too small, double the difference from the last value.", image=""))
    db.session.add(Step(project_id=7, step_number=3, title="Go to Step 1", description="The more repeats the better!", image=""))
    db.session.add(Step(project_id=8, step_number=1, title="Code Explanation", description="The function has a special case for the trivial case (if the user wants to roll between 0 and 0) because the log of 0 is undefined. After that, using the log conversion, the function calculates the number of digits required from the random number table based on the encoding base.\n\nThen incrementing the stored index provides the start and end indices for the slice of the table to interpret. Interpreting the slice of the table into base 10 then allows it to be returned. Finally, incrementing the stored index moves the table along.\n\nIn the situation where the number of outcomes is not a power of the encoding base, it should be noted that it's impossible to completely eliminate bias. This approach of dividing the remainder into fractional parts in the remainder naturally separates the clumps of results. Compared to the results clumping at the lower values by using modulo, this method obfuscates the location of the bias slightly.", image="images/project-range/range-code.png"))
    db.session.add(Step(project_id=9, step_number=1, title="Code Explanation", description="By using the type argument as the hashing key, it's then becomes possible to both randomly select or non-randomly select a particular entity from the list. Notably, a non-random select will require setting what the selection will be somewhere, and in an implementation that uses non-random selection more frequently, an additional argument (or not using the factory pattern at all) may be better. Finally, it should be noted that having a default (or non-conditional else statement) allows for catching unexpected situations (such as a misspelled type) while not halting program flow.", image="images/project-rooms/rooms-code.png"))
    db.session.add(Step(project_id=10, step_number=1, title="Code Explanation", description="The key to the function was identifying the all exceptions. Here were the notable ones:\n• numbers ending in 1 become ~1st, except numbers ending in 11 which become ~11th\n• numbers ending in 2 become ~2nd, except numbers ending in 11 which become ~12th\n• numbers ending in 1 become ~3rd, except numbers ending in 11 which become ~13th\n• all other numbers end in ~th\nThis made checking the ones and tens digits of the number important. Modulus math in combination with a switch statement default made for a fairly elegant solution.", image="images/project-ordinal/ordinal-code.png"))
    db.session.commit()

def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
