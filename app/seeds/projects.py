from app.models import db, Project

def seed_projects():
    QueensGambit = Project(
        user_id = 3, title = 'Queen\'s Gambit', description = 'White immediately responds to Black\'s attempt to gain a foothold in the center by striking out with their c-pawn. Though this pawn is not defended and Black can capture it with ... dxc4, doing so will remove Black\'s d-pawn from the center and give White more opportunities for central control. Therefore, Black often chooses to decline the gambit, which he can do in several ways.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = "/images/Chess/QG/QG3.png")
    QueensGambitAccepted = Project(
        user_id = 3, title = 'Queen\'s Gambit Accepted', description = 'The Queen\'s Gambit Accepted has a rich heritage in chess, both sides played by many of the world champions through the years. It is not really much of a gambit since white can recover the pawn immediately with 3. Qa4+, though unless white wants the queen placed on c4, this is unnecessary.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = "/images/Chess/QGA/QGA4.png")
    QueensGambitDeclined = Project(
        user_id = 3, title = 'Queen\'s Gambit Declined', description = 'With 2...e6, Black declines the Queen\'s Gambit in the traditional fashion. 2...e6 bolsters the d5 pawn and opens a diagonal for the development of Black\'s dark-squared bishop. However, 2...e6 also blocks the c8-h3 diagonal for Black\'s light-squared bishop. Finding a way to productively develop this piece is a perennial challenge for Black players in the QGD.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = "/images/Chess/QGD/QGD4.png")
    Italian = Project(
        user_id = 3, title = 'The Italian Game', description = 'And so we reach the Italian Game. White takes aim at Black\'s weak f7 pawn. Now there are a number of options for Black. This opening is more reserved than the Ruy Lopez.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = "/images/Chess/Italian/ITA5.png")
    RuyLopez = Project(
        user_id = 3, title = 'The Ruy Lopez', description = 'The essential move marking the Ruy Lopez, or Spanish Game. "It is the double king\'s pawn opening most commonly used in master play; it has been adopted by almost all players at some point in their careers and many play it from both the White and Black sides. White threatens to trade off Black\'s c6-knight, leaving the e5-pawn undefended. It\'s not an immediate threat, because after 4. Bxc6 dxc6 5. Nxe5, Black can win the pawn back with 5... Qd4 or 5... Qg5. Black can respond in a variety of ways. The most common move is the Morphy Defence 3... a6. This forces White to make a decision about the Bishop - retreat or exchange. Many other moves are available, some neglecting completely the protection of the knight and the pawn and continuing development. The opening is named after the 16th century Spanish priest Ruy López de Segura.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = "/images/Chess/RuyLopez/RL5.png")

    cherry_bracelet = Project(
        user_id=10,
        title="Beaded Cherry Bracelet",
        description="There's nothing better than spotting the first signs of summer at the market. Cherries and peaches are a household favorite! In celebration of the arrival of a new season, I'll be showing you how to add beaded cherries to your summer stack. It's extremely easy and can be incorporated in a variety of ways! I love mixing the deep red and green seed beads with delicate freshwater pearls - but you can also add other seed beads to the mix.",
        category_id=4,
        supplies_text="- Cherry Red & Pine Green 8/0 frosted seed beads - Milky White 8/0 seed beads or 2.5mm freshwater pearls - 0.5mm elastic beading cord - Scissors - Scotch tape - Clear nail polish",
        supplies_image="/images/jewelry/cherry-bracelet/diycherry1.jpeg"
    )

    tila_bracelet = Project(
        user_id=10,
        title="Tila Bead Bracelet",
        description="The Tila bead bracelet is my favorite summer accessory. Not to mention they are incredibly easy to make. Miyuki Tila beads are little square and rectangular glass beads and literally come in every color you can possibly imagine, which makes playing around with all kinds of amazing color combinations very addictive.",
        category_id=4,
        supplies_text="- Miyuki Tila beads (an assortment of quarter, half and square Tila beads) - stretch cord (0.5mm for a softer stretch and 0.7mm for a tighter stretch) - scissors or cutters - clear nail polish",
        supplies_image="/images/jewelry/tila-bracelet/tilabeadproject1.jpeg"
    )

    daisy_bracelet = Project(
        user_id=10,
        title="Beaded Daisy Chain Bracelet",
        description="Honestly, is there anything happier than daisies?! I was desperately needing a dose of happy over the weekend and whipped up a few colorful bracelets to soothe the soul. Making daisy chains from seed beads might look complicated but honestly, it's not difficult at all! It's a cinch as long as you have the right materials. I dare you to stop at one, it's that addicting. Just be sure to pay attention to the size of the beads and stringing cord before you purchase the supplies. Have fun!",
        category_id=4,
        supplies_text="- 8/0 seed beads, assorted colors (I used frosted innocent pink, frosted cantelope, opaque sunshine, frosted shamrock, frosted turquoise, frosted periwinkle and frosted light beige) - no.8 Griffin silk thread with needle - 3mm brass bead (optional) - no.10 Griffin silk thread or 0.8-1mm Chinese knotting cord (for closure) - scissors - pliers (optional) - materials for other bracelets - freshwater pearls - African beads - Czech beads - 0.5mm elastic string - 11/0 gold seed beads",
        supplies_image="/images/jewelry/daisy-bracelet/daisychainproject1.jpeg"
    )

    mother_of_pearl_necklace = Project(
        user_id=10,
        title="Mother of Pearl Necklace",
        description="Summer is just weeks away and although we don't quite know what the near future will look like just yet, I'm looking forward for easing up on just about every aspect of life. I recently stumbled upon these adorable mother of pearl charms and the idea of incorporating them into some necklaces tickled me pink. They're just perfect for summer!",
        category_id=4,
        supplies_text="- mother of pearl letter charms - mother of pearl evil eye clover charm - mother of pearl hamsa charm - mother of pearl bows, bunnies and zodiac - ombré gemstone rondelle beads (pink opal, rainbow sapphire, tourmaline and blue sapphires) - freshwater pearls - gold spacer beads - 4mm gold filled crimp bead covers - 6mm closed jump rings - 7 x 12mm lobster clasps - metallic flex wire in gold - 0.5mm waxed cord (for single bead necklaces) - chain nose pliers - crimping tool - scissors - scotch tape",
        supplies_image="/images/jewelry/mother-of-pearl-necklace/motherofpearlproject1.jpeg"
    )

    shell_necklace = Project(
        user_id=10,
        title="Beaded Shell Necklaces",
        description="Throughout the years, I've collected an endless stands of beads from all over the world - from my jewelry designing days to my present Etsy trolling days. After stumbling upon a few pretty gold shell charms a couple of weeks ago, I knew I had to put some of my favorite beads to good use. After all, is there anything that epitomizes summer more than a layered stack of beaded shell necklaces? I think not . . .",
        category_id=4,
        supplies_text="- gold shell charms (sea star charms, sea shells, cowrie shells) - beads (bone heshi, African record disc heshi beads, Ghana glass beads) - beading cord - crimp beads - gold clasps - gold closed jump rings - bead crimper - embroidery needle - tassels (optional)",
        supplies_image="/images/jewelry/shell-necklace/shellsproject1.jpg"
    )

    db.session.add(QueensGambit)
    db.session.add(QueensGambitAccepted)
    db.session.add(QueensGambitDeclined)
    db.session.add(Italian)
    db.session.add(RuyLopez)

    db.session.add(cherry_bracelet)
    db.session.add(tila_bracelet)
    db.session.add(daisy_bracelet)
    db.session.add(mother_of_pearl_necklace)
    db.session.add(shell_necklace)

    db.session.add(Project(user_id=9, category_id=3, title="Pseudo-Random Number Table", description="Games have myriad uses for randomization, but in many cases the constraints on this type of randomization can differ greatly from cryptography and other uses of random number generation. For one, many genres where sharing a generated layout or route can be a feature, generating those results from an initial seed instead of generating the results in the moment can be beneficial. Of course, this is technically not random as reliably producing the same result from the same initial condition is actually a deterministic behavior, but because of the practical unpredictability desired for this system, we'll continue to refer to them as \"random numbers\".\n\nAnother key difference is that game random number generation rarely requires the generation process to take time as cryptography does to mitigate brute force attacks; because random number generation is used to determine the results of events in the game, resolving those results quickly can prevent hold-ups in gameplay.", supplies_image="/images/project-rnTable/table-supplies.png", supplies_text="Initially I had written my own hashing function for this table generator, but found that tuning it so that numbers wouldn't clump was very difficult. While clumps are indeed an important part of randomized sequences, the in the case of a game, the appearance of randomness should be prioritized, and thus the results of the has shouldn't have frequent or long running clumps if possible. After some testing, it was discovered that sha256 suitably met the previously discussed concerns. Fortunately for my JavaScript implementation, sha256 is accessible via the built-in library crypto."))
    db.session.add(Project(user_id=9, category_id=3, title="Game Balance", description="Balancing a game can seem daunting with all the moving parts. One way to formalize the process, commonly referred to as the Sid Meier Method, helps maximize the progress towards a balanced state per iteration. Similar to Newton's Method of finding numerical solutions, the method tracks previous state as it progresses toward the desired state.", supplies_text="", supplies_image=""))
    db.session.add(Project(user_id=9, category_id=3, title="Abitrary Ranges from a Random Number Table", description="After creating a table with random (enough) data, progressing through the table in a way that accommodates odds that are not powers of the base of the table can be difficult. This project will demonstrate a strategy that mitigates the bias introduced by using odds that the number base is less divisible by.", supplies_text="This implementation requires an index to keep track of where in the random number table the next number will be read from. It's also possible to have track multiple indices if different events should not effect the results of each other (eg keeping enemy movements from affecting item drops). Of course, it also requires a random number table, an implementation of which is covered at \"this link\".", supplies_image="/images/project-range/range-supplies.png"))
    db.session.add(Project(user_id=9, category_id=3, title="Factory Pattern Room Loader", description="In the following code snippet I tackled the problem of randomly selecting a room template of a specified category from a pool of rooms. I used factory pattern in this implementation to encapsulate the list of room templates from the module that was doing the selecting and allow individual rooms to appear in multiple categories.", supplies_text="This implementation requires a hash table. Each entity category should point to an array of all the entities that are classified under that category. This implementation also requires a random number selection from between 0 and the length of each of the arrays, you can click \"this link\" to see how I made a random number selector that worked for arbitrary ranges.", supplies_image="/images/project-rooms/rooms-supplies.png"))
    db.session.add(Project(user_id=9, category_id=3, title="Ordinal Suffix Generator", description="The English language has an interesting quirk where ordered numberings have their own pronunciations. Using these can help communicate that things are of ordinal nature, however the inconsistent pattern of pronunciations can make implementing them programmatically non-trivial. In order to use them in various projects, I worked with some friends to make a function that takes a number and generates the ordinal pronunciation.", supplies_text="", supplies_image=""))

    start_knitting = Project(
        user_id = 4,
        title = "How to Get Started Knitting: The Knit Stitch",
        description = "Knitting has seen a surge in popularity recently as more people learn about its therapeutic benefits. So maybe you want to get started with knitting, but don't know where to begin? This guide is for you! We'll start off with the most basic of stitches, the knit stitch, done the American way.",
        category_id = 2,
        supplies_text = "- any weight yarn  - any size knitting needles (straight or circular)",
        supplies_image = "/images/knitting/start-knitting06.jpg",
        project_image = "/images/knitting/start-knitting01.jpg"
    )
    choose_yarn = Project(
        user_id = 4,
        title = "How to Choose the Perfect Yarn for the Pattern",
        description = "So now you know how to knit a few basic stitches, and want to tackle a project! Before you dive in, there are a few important considerations in addition to color for choosing the right yarn for the pattern of your choice. This guide will walk you through finding the perfect yarn for your next project!",
        category_id = 2,
        supplies_text = "",
        supplies_image = "",
        project_image = "/images/knitting/choose-yarn01.jpg"
    )
    knit_hat = Project(
        user_id = 5,
        title = "How to Knit a Basic Hat",
        description = "Hats are a great beginner project or Holiday gift. In addition to mastering basic knits and purls, you can learn the fundamentals of 3-dimensional construction with decreases and shaping. Hats are also a great blank canvas on which to let your creativity flow.",
        category_id = 2,
        supplies_text = "- approximately 300 yards of chunky weight yarn  - 5.0mm circular needles  - 5.5mm circular needles  - tapestry needle for weaving in ends",
        supplies_image = "/images/knitting/knit-hat02.jpg",
        project_image = "/images/knitting/knit-hat01.jpg"
    )
    read_lace = Project(
        user_id  = 6,
        title = "Learn How to Read Lace Knitting Charts",
        description = "There are so many great lace knitting charts out there, and you want to include them in your projects! If you've never read charted instructions before, this guide is for you.",
        category_id = 2,
        supplies_text = "",
        supplies_image = "",
        project_image = "/images/knitting/read-lace01.jpg"
    )
    db.session.add(start_knitting)
    db.session.add(choose_yarn)
    db.session.add(knit_hat)
    db.session.add(read_lace)

    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
