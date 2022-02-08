from app.models import db, Step

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

    cherry_step_1 = Step(
        project_id=6,
        step_number=1,
        title="Bracelet Set Up",
        description="Start by cutting a 16-20 inch piece of elastic beading cord. Fold a piece of tape over the tail end of the cord, leaving 3-4 inches at the end. You'll want enough cord leftover to tie the bracelet in a double knot when finished. And whether its with pearls or seed beads, you'll want to divide the cherries with some spacer beads. So thread on some beads before making the cherry cluster.",
        image="react-app/public/images/jewelry/cherry-bracelet/diycherry1.jpeg"
    )

    cherry_step_2 =  Step(
        project_id=6,
        step_number=2,
        title='Add Cherry Beads',
        description="Then, add one green and 2 red seed beads.",
        image="react-app/public/images/jewelry/cherry-bracelet/diycherry2.jpeg"
    )

    cherry_step_3 =  Step(
        project_id=6,
        step_number=3,
        title='Create the Cherry',
        description="Thread the end of the elastic through the green bead - from the start of the bracelet towards the end. While holding the green bead in place with your fingers (this prevents the cherry from slipping away from the previous beads), pull the end of the elastic until it's taut.",
        image="react-app/public/images/jewelry/cherry-bracelet/diycherry3.jpeg"
    )

    cherry_step_4 =  Step(
        project_id=6,
        step_number=4,
        title='Finishing the Bracelet',
        description="Continue adding beads and cherries until you've reached your desired length. Carefully tie into a triple knot. Add a drop of clear nail polish over the knot to secure it.",
        image="react-app/public/images/jewelry/cherry-bracelet/diycherry4.jpeg"
    )

    tila_step_1 =  Step(
        project_id=7,
        step_number=1,
        title='Bracelet Set Up',
        description='Start by cutting two strands of 16-18" stretchy cord. Tie the ends into a single knot.',
        image="react-app/public/images/jewelry/tila-bracelet/tilabead1.jpeg"
    )

    tila_step_2 =  Step(
        project_id=7,
        step_number=2,
        title='String on the Tila Beads',
        description="Miyuki Tila beads are flat, two-holed glass squares. Both sides are slightly domed and have 2 .8mm parallel holes. They come in a huge variety of colors and 3 different sizes: quarter, half and full square, which the possibilities endless when it comes to different color combinations. You'll thread the beads onto both strands of stretchy cord at a time.",
        image="react-app/public/images/jewelry/tila-bracelet/tilabead2.jpeg"
    )

    tila_step_3 =  Step(
        project_id=7,
        step_number=3,
        title='Continue Adding Beads',
        description="Continue adding beads until you've reached the desired length. Remember that you won't be leaving any room for a clasp for this bracelet! Once you've finished adding your beads, undo the initial knot you made.",
        image="react-app/public/images/jewelry/tila-bracelet/tilabead3.jpeg"
    )

    tila_step_4 =  Step(
        project_id=7,
        step_number=4,
        title='Knot the Ends of the Bracelet',
        description="Tie one set of strands into a tight double knot. This can be a little tricky as the bracelet will try to flip on you but just be patient! When the first knot is tied, tie the 2nd strand into a tight double knot. Then carefully place a very tiny dollop of clear nail polish on both knots.",
        image="react-app/public/images/jewelry/tila-bracelet/tilabead4.jpeg"
    )

    tila_step_5 =  Step(
        project_id=7,
        step_number=5,
        title='Finishing the Bracelet',
        description="Allow to dry completely before trimming away any excess. Your bracelet is ready to wear. And I dare you to make just one!",
        image="react-app/public/images/jewelry/tila-bracelet/tilabead5.jpeg"
    )

    daisy_step_1 =  Step(
        project_id=8,
        step_number=1,
        title='Bracelet Set Up',
        description="Using the right thread or cord is important here. My favorite thread for the daisy chain is Griffin twisted silk thread. It comes with an attached needle which makes threading through the tiny seed beads seamless, especially since you will have to double up the thread through some seed beads. Unravel the entire card and double knot the end. You will want to leave about a 3-4 in tail. Note: You definitely do not want to use elastic cording here. It is too difficult to get a tight weave on the daisy.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy1.jpeg"
    )

    daisy_step_2 =  Step(
        project_id=8,
        step_number=2,
        title='Thread the Daisy Petal Beads',
        description="Thread on a few seed beads. Then, you'll add the daisy petal colors and form the top half portion of the flower. Because I'm using a slightly larger center gold bead here, I'm adding 5 beads here. If you were to use a smaller center bead (like a 8/0 seed bead), then I'd add 4.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy2.jpeg"
    )

    daisy_step_3 =  Step(
        project_id=8,
        step_number=3,
        title='Thread the Center Daisy Bead',
        description="Add the center bead. Again, I'm using a 3mm gold bead here but you can sub any sized bead. Take the needle and thread it through the 1st colored bead, towards the knot/end of the bracelet. Note: See how it's important to have a cord or thread that can pass through your seed bead twice? Size and material is crucial!",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy3.jpeg"
    )

    daisy_step_4 =  Step(
        project_id=8,
        step_number=4,
        title='Thread and Tighten the First Half of the Daisy',
        description="Pull the thread all the way through. You'll want everything pulled together as tight as possible.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy4.jpeg"
    )

    daisy_step_5 =  Step(
        project_id=8,
        step_number=5,
        title='Add the Second Half of the Daisy Petal Beads',
        description="Add on three more colored beads. Then, take the needle and thread it through the last colored bead, before your center bead. This should be going in the direction opposite of the start of the bracelet.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy5.jpeg"
    )

    daisy_step_6 =  Step(
        project_id=8,
        step_number=6,
        title='Tighten Thread to Form Daisy',
        description="Pull the cord all the way, forming the daisy. You might want to adjust the beads as you tighten to pop them into place and make sure they're evenly distributed.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy6.jpeg"
    )

    daisy_step_7 =  Step(
        project_id=8,
        step_number=7,
        title='Continue the Pattern',
        description="Once it all feels taut, add a few more spacer beads before starting the next daisy. Continue the pattern until you're reached the ideal length.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy7.jpeg"
    )

    daisy_step_8 =  Step(
        project_id=8,
        step_number=8,
        title='Finishing the Bracelet',
        description="To close, you can either use a clasp or a sliding macrame closure. There are plenty of great sliding macrame closure tutorials Youtube. Feel free to choose either one! If you decide to do a sliding closure, leave about an ince of space.  If you're just adding a clasp, you can leave about a 1/4-1/3 inches of space.",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychaindiy8.jpeg"
    )

    pearl_step_1 =  Step(
        project_id=9,
        step_number=1,
        title='Bracelet Set Up',
        description="I'm using gemstones here because I just happened to have them. But you can definitely replace them with seed beads or African trade beads from previous projects. Cut the desired length of your necklace plus 6 inches. Fold a piece of scotch tape over the end of the wire.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl1.jpeg"
    )

    pearl_step_2 =  Step(
        project_id=9,
        step_number=2,
        title='Adding Beads and Laying Out Your Pattern',
        description="The reason why I don't add the clasp on now is because I want me the letters to be centered on the necklace and I'm not sure yet how many beads I'll want to add on each side. By taping the end, it allows you to add beads to either end to balance the beads out. Start adding your beads. When you've figured out your pattern, you can start adding your mother of pearl letters.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl2.jpeg"
    )

    pearl_step_3 =  Step(
        project_id=9,
        step_number=3,
        title='Continue Pattern',
        description="Continue adding beads until it's even on both sides.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl3.jpeg"
    )

    pearl_step_4 =  Step(
        project_id=9,
        step_number=4,
        title='Adding Beads to Your Desired Length',
        description="You can start adding beads on either side to achieve the desired length. When you're finished, you can start adding your clasps. You'll need a closed jump ring, a clasp and 2 crimp beads.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl4.jpeg"
    )

    pearl_step_5 =  Step(
        project_id=9,
        step_number=5,
        title='Adding the Clasp',
        description="Thread a crimp tube on and then the clasp. Thread the stringing wire back through the crimp tube and pull to tighten, leaving a little tail",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl5.jpeg"
    )

    pearl_step_6 =  Step(
        project_id=9,
        step_number=6,
        title='Crimping the Crimp Tube',
        description="You can close your crimp tube with a pair of chain nose pliers but a crimping tool can be even more efficient and handy for closing crimp beads. They're about $8 and a good tool to have in your craft tool box! Position the crimp bead and thread in the second oval of the pliers (the one with the dip), and close the pliers around the bead. You'll see it curl.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl6.jpeg"
    )

    pearl_step_7 =  Step(
        project_id=9,
        step_number=7,
        title='Continue Crimping the Crimp Tube',
        description="Next, turn the crimp bead to its side, position it in the first oval, and close the pliers around the crimp bead again so that you're compressing the curled bead into a rounded shape.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl7.jpeg"
    )

    pearl_step_8 =  Step(
        project_id=9,
        step_number=8,
        title='Trim the Excess Wire',
        description="Give it a little tug to make sure the stringing wire is secure. Then trim the excess wire.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl8.jpeg"
    )

    pearl_step_9 =  Step(
        project_id=9,
        step_number=9,
        title='Add Crimp Cover',
        description="The edges of the crimp tube can be rather scratchy so I recommend using a crimp cover to conceal the crimp tube, making the clasp smooth and seamless. Slip the crimp cover over the crimp bead and use your pliers to squeeze it closed.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl9.jpeg"
    )

    pearl_step_10 =  Step(
        project_id=9,
        step_number=10,
        title='Finish the Necklace',
        description="Repeat on the other side and you're done! The same method can be used for any beaded necklace.",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearl10.jpeg"
    )

    shell_step_1 =  Step(
        project_id=10,
        step_number=1,
        title='Bracelet Set Up',
        description="Start by unraveling the bead cord. I like using the Griffin Beading Cord because it comes in a variety of color and comes with a needle attached, which makes beading so much easier. Thread on a crimping bead and then a lobster clasp.",
        image="react-app/public/images/jewelry/shell-necklace/shell1.jpg"
    )

    shell_step_2 =  Step(
        project_id=10,
        step_number=2,
        title='Crimping',
        description="Pull both the crimping bead and clasp towards the end of the cord. Then take the needle and thread it through the crimp bead, out towards the ends of the cord. Pull it tight and then crimp the bead with a crimper. If you don't have a crimper, you can use a pair of pliers to squeeze the crimp bead shut.",
        image="react-app/public/images/jewelry/shell-necklace/shell2.jpg"
    )

    shell_step_3 =  Step(
        project_id=10,
        step_number=3,
        title='Thread Beads',
        description="Trim away the extra tail of cording. Start threading on beads and stop when you've reached half the length desired for your necklace.",
        image="react-app/public/images/jewelry/shell-necklace/shell3.jpg"
    )

    shell_step_4 =  Step(
        project_id=10,
        step_number=4,
        title='Add the Remaining Beads',
        description="Add the remaining beads. Add a crimp bead and a closed jump ring. Thread the needle back through the jump ring and then through the crimp bead, towards the necklace.",
        image="react-app/public/images/jewelry/shell-necklace/shell4.jpg"
    )

    shell_step_5 =  Step(
        project_id=10,
        step_number=5,
        title='Finish the Necklace',
        description="Pull the cord taut and crimp the crimp bead closed.",
        image="react-app/public/images/jewelry/shell-necklace/shell5.jpg"
    )

    db.session.add(QG1)
    db.session.add(QG2)
    db.session.add(QG3)

    db.session.add(cherry_step_1)
    db.session.add(cherry_step_2)
    db.session.add(cherry_step_3)
    db.session.add(cherry_step_4)

    db.session.add(tila_step_1)
    db.session.add(tila_step_2)
    db.session.add(tila_step_3)
    db.session.add(tila_step_4)
    db.session.add(tila_step_5)

    db.session.add(daisy_step_1)
    db.session.add(daisy_step_2)
    db.session.add(daisy_step_3)
    db.session.add(daisy_step_4)
    db.session.add(daisy_step_5)
    db.session.add(daisy_step_6)
    db.session.add(daisy_step_7)
    db.session.add(daisy_step_8)

    db.session.add(pearl_step_1)
    db.session.add(pearl_step_2)
    db.session.add(pearl_step_3)
    db.session.add(pearl_step_4)
    db.session.add(pearl_step_5)
    db.session.add(pearl_step_6)
    db.session.add(pearl_step_7)
    db.session.add(pearl_step_8)
    db.session.add(pearl_step_9)
    db.session.add(pearl_step_10)

    db.session.add(shell_step_1)
    db.session.add(shell_step_2)
    db.session.add(shell_step_3)
    db.session.add(shell_step_4)
    db.session.add(shell_step_5)

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

    db.session.add(Step(project_id=11, step_number=1, title="Code Explanation", description="The hashing function handled nearly all of the previously mentioned concerns, but had two wrinkles to take care of.\n\nFirst, when interpreting the result of the hash as a number, JavaScripts default number type did not have enough accuracy to represent the result completely. This resulted in the last several digits on the table always being set to 0. To address this, I split the result into several string segments, then joined them back together after interpreting them into the desired encoding base.\n\nThe second issue was more of a self-imposed constraint. In order to mitigate some of the bias in reading the table with arbitrary ranges, I decided I wanted to encode the random number table in base 12 because it was a local high point for divisibility with other numbers. This meant converting from sha256's base 64 results into base 10, which could then be converted into base 12 since JavaScripts base conversion isn't arbitrary.", image="images/project-rnTable/table-code.png"))
    db.session.add(Step(project_id=12, step_number=1, title="Is it balanced?", description="If yes, you're done. If no, continue to Step 2.\nIf this is your (large number)th time here or later, consider changing the mechanic entirely.", image=""))
    db.session.add(Step(project_id=12, step_number=2, title="Is the number too big or too small?", description="If too big, halve the difference from the last value. If too small, double the difference from the last value.", image=""))
    db.session.add(Step(project_id=12, step_number=3, title="Go to Step 1", description="The more repeats the better!", image=""))
    db.session.add(Step(project_id=13, step_number=1, title="Code Explanation", description="The function has a special case for the trivial case (if the user wants to roll between 0 and 0) because the log of 0 is undefined. After that, using the log conversion, the function calculates the number of digits required from the random number table based on the encoding base.\n\nThen incrementing the stored index provides the start and end indices for the slice of the table to interpret. Interpreting the slice of the table into base 10 then allows it to be returned. Finally, incrementing the stored index moves the table along.\n\nIn the situation where the number of outcomes is not a power of the encoding base, it should be noted that it's impossible to completely eliminate bias. This approach of dividing the remainder into fractional parts in the remainder naturally separates the clumps of results. Compared to the results clumping at the lower values by using modulo, this method obfuscates the location of the bias slightly.", image="images/project-range/range-code.png"))
    db.session.add(Step(project_id=14, step_number=1, title="Code Explanation", description="By using the type argument as the hashing key, it's then becomes possible to both randomly select or non-randomly select a particular entity from the list. Notably, a non-random select will require setting what the selection will be somewhere, and in an implementation that uses non-random selection more frequently, an additional argument (or not using the factory pattern at all) may be better. Finally, it should be noted that having a default (or non-conditional else statement) allows for catching unexpected situations (such as a misspelled type) while not halting program flow.", image="images/project-rooms/rooms-code.png"))
    db.session.add(Step(project_id=15, step_number=1, title="Code Explanation", description="The key to the function was identifying the all exceptions. Here were the notable ones:\n• numbers ending in 1 become ~1st, except numbers ending in 11 which become ~11th\n• numbers ending in 2 become ~2nd, except numbers ending in 11 which become ~12th\n• numbers ending in 1 become ~3rd, except numbers ending in 11 which become ~13th\n• all other numbers end in ~th\nThis made checking the ones and tens digits of the number important. Modulus math in combination with a switch statement default made for a fairly elegant solution.", image="images/project-ordinal/ordinal-code.png"))

    db.session.add(Step(
        project_id = 16,
        step_number = 1,
        title = "Set Up Needles and Yarn",
        description = "This type of knit stitch is called American, or \"thrown\", style. With American style knitting, you hold the yarn in your right hand and \"throw\" the yarn across the needle. To begin, hold the knitting needle with the cast-on stitches in your left hand, and the knitting needle without any stitches in your right hand. With the yarn in the back of your work, insert the right needle into the front of the first stitch. You'll insert your needle to the left of that stitch and through. Your right knitting needle will be underneath your left needle.",
        image = "react-app/public/images/knitting/start-knitting02.jpg"
    ))
    db.session.add(Step(
        project_id = 16,
        step_number = 2,
        title = "Wrap Yarn Around Needle",
        description = "Wrap your yarn around the right needle from back to front, so that it rests between the two needles.",
        image = "react-app/public/images/knitting/start-knitting03.jpg"
    ))
    db.session.add(Step(
        project_id = 16,
        step_number = 3,
        title = "Slide Right Needle",
        description = "Slide the right needle down and bring the point forward through the stitch, bringing the yarn with it.",
        image = "react-app/public/images/knitting/start-knitting04.jpg"
    ))
    db.session.add(Step(
        project_id = 16,
        step_number = 4,
        title = "Slip Old Stitch Off Left Needle",
        description = "Slip the old stitch off the left needle. Make sure you only slip that first stitch off the needle, don't let any of the others off the needle yet. Now the new stitch is on your right needle.",
        image = "react-app/public/images/knitting/start-knitting05.jpg"
    ))
    db.session.add(Step(
        project_id = 16,
        step_number = 5,
        title = "Continue Knitting the Entire Row",
        description = "Repeat these four steps for each stitch on your left needle. At the end of the row, all the new stitches are on your right needle now and your left knitting needle is empty. You will not switch your knitting needles so that the empty needle is again your right hand. Begin once more by knitting with the first stitch and beyond.",
        image = ""
    ))
    db.session.add(Step(
        project_id = 17,
        step_number = 1,
        title = "Yarn Weight",
        description = "The first step to knitting a pattern is to look at the yarn weight requirements. Yarn weights can come in different units of measurement, from American Standard (laceweight to jumbo) to numbers. It can sometimes be confusing to translate these units of measurement, but thankfully the Craft Yarn Council has published a chart of yarn industry standards that you can find online! Make sure the yarn you choose for the project is as close to the weight recommended in the project, otherwise the resulting fabric may look vastly different.",
        image = "react-app/public/images/knitting/choose-yarn02.jpg"
    ))
    db.session.add(Step(
        project_id = 17,
        step_number = 2,
        title = "Yardage",
        description = "Whether you are working from yarn you already have in stash or are purchasing new yarn specifically for the project, you'll next want to check the yardage or meterage requirements. Make sure you have just a little bit extra to account for any mistakes, especially if purchasing hand-dyed yarn! The color can vary from dyelot to dyelot, so buying all the yarn for a project in one-go is typically recommended.",
        image = ""
    ))
    db.session.add(Step(
        project_id = 17,
        step_number = 3,
        title = "Fiber Content",
        description = "Finally, you'll want to consider the fiber content of the yarn. Are you knitting a sweater that will need to be warm and water-resistant? Natural animal fibers such as wool are going to be your best bet. Looking for easy-care baby knits for new parents? Acrylic yarns that can be thrown in the washing machine will save gift recipients lots of time and headaches. Knitting a light, summery cardigan or accessory? Consider a plant-based fiber such as linen for breathability. With all of these options, it's important to also keep in mind the various care needed.",
        image = "react-app/public/images/knitting/choose-yarn03.jpg"
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 1,
        title = "Abbreviations",
        description = "- K: Knit  - P: Purl  - K2tog: Knit two stitches together",
        image = ""
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 2,
        title = "Cast on",
        description = "Using 5.0mm circular needles, cast on 88 stitches using the cast on method of your choice.",
        image = ""
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 3,
        title = "Ribbing",
        description = "Knit 4 inches in 2x2 rib (K2, p2, repeat around).",
        image = ""
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 4,
        title = "Change needles and continue",
        description = "Change to 5.5mm circular needles.",
        image = ""
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 5,
        title = "Welted pattern",
        description = "K 4 rounds, P 5 rounds. Repeat this for a total of 5 times.",
        image = ""
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 6,
        title = "Begin decreases",
        description = "K1, k2tog, repeat until end. Knit all around. K1, k2tog, repeat until end. Knit all around. K2tog, repeat until end. K2tog, repeat until end.",
        image = ""
    ))
    db.session.add(Step(
        project_id = 18,
        step_number = 7,
        title = "Finishing up!",
        description = "Cut yarn and pull through remaining stitches. Using your tapestry needle, weave ends in, and proudly wear on your head!",
        image = ""
    ))

    db.session.commit()


def undo_steps():
    db.session.execute('TRUNCATE steps RESTART IDENTITY CASCADE;')
    db.session.commit()
