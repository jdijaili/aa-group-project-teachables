from app.models import db, Project

def seed_projects():
    QueensGambit = Project(
        user_id = 1, title = 'Queen\'s Gambit', description = 'White immediately responds to Black\'s attempt to gain a foothold in the center by striking out with their c-pawn. Though this pawn is not defended and Black can capture it with ... dxc4, doing so will remove Black\'s d-pawn from the center and give White more opportunities for central control. Therefore, Black often chooses to decline the gambit, which he can do in several ways.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None
    )
    QueensGambitAccepted = Project(
        user_id = 1, title = 'Queen\'s Gambit Accepted', description = 'The Queen\'s Gambit Accepted has a rich heritage in chess, both sides played by many of the world champions through the years. It is not really much of a gambit since white can recover the pawn immediately with 3. Qa4+, though unless white wants the queen placed on c4, this is unnecessary.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None
    )
    QueensGambitDeclined = Project(
        user_id = 1, title = 'Queen\'s Gambit Declined', description = 'With 2...e6, Black declines the Queen\'s Gambit in the traditional fashion. 2...e6 bolsters the d5 pawn and opens a diagonal for the development of Black\'s dark-squared bishop. However, 2...e6 also blocks the c8-h3 diagonal for Black\'s light-squared bishop. Finding a way to productively develop this piece is a perennial challenge for Black players in the QGD.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None
    )
    Italian = Project(
        user_id = 1, title = 'The Italian Game', description = 'And so we reach the Italian Game. White takes aim at Black\'s weak f7 pawn. Now there are a number of options for Black. This opening is more reserved than the Ruy Lopez.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None
    )
    RuyLopez = Project(
        user_id = 1, title = 'The Ruy Lopez', description = 'The essential move marking the Ruy Lopez, or Spanish Game. "It is the double king\'s pawn opening most commonly used in master play; it has been adopted by almost all players at some point in their careers and many play it from both the White and Black sides. White threatens to trade off Black\'s c6-knight, leaving the e5-pawn undefended. It\'s not an immediate threat, because after 4. Bxc6 dxc6 5. Nxe5, Black can win the pawn back with 5... Qd4 or 5... Qg5. Black can respond in a variety of ways. The most common move is the Morphy Defence 3... a6. This forces White to make a decision about the Bishop - retreat or exchange. Many other moves are available, some neglecting completely the protection of the knight and the pawn and continuing development. The opening is named after the 16th century Spanish priest Ruy López de Segura.', category_id = 1, views = 0, favorites = 0, supplies_text = None, supplies_image = None
    )

    cherry_bracelet = Project(
        user_id=10,
        title="Beaded Cherry Bracelet",
        description="There's nothing better than spotting the first signs of summer at the market. Cherries and peaches are a household favorite! In celebration of the arrival of a new season, I'll be showing you how to add beaded cherries to your summer stack. It's extremely easy and can be incorporated in a variety of ways! I love mixing the deep red and green seed beads with delicate freshwater pearls - but you can also add other seed beads to the mix.",
        category_id=4,
        supplies_text="- Cherry Red & Pine Green 8/0 frosted seed beads - Milky White 8/0 seed beads or 2.5mm freshwater pearls - 0.5mm elastic beading cord - Scissors - Scotch tape - Clear nail polish",
        image="react-app/public/images/jewelry/cherry-bracelet/diycherryproject1.jpeg"
    )

    tila_bracelet = Project(
        user_id=10,
        title="Tila Bead Bracelet",
        description="The Tila bead bracelet is my favorite summer accessory. Not to mention they are incredibly easy to make. Miyuki Tila beads are little square and rectangular glass beads and literally come in every color you can possibly imagine, which makes playing around with all kinds of amazing color combinations very addictive.",
        category_id=4,
        supplies_text="- Miyuki Tila beads (an assortment of quarter, half and square Tila beads) - stretch cord (0.5mm for a softer stretch and 0.7mm for a tighter stretch) - scissors or cutters - clear nail polish",
        image="react-app/public/images/jewelry/tila-bracelet/tilabeadproject1.jpeg"
    )

    daisy_bracelet = Project(
        user_id=10,
        title="Beaded Daisy Chain Bracelet",
        description="Honestly, is there anything happier than daisies?! I was desperately needing a dose of happy over the weekend and whipped up a few colorful bracelets to soothe the soul. Making daisy chains from seed beads might look complicated but honestly, it's not difficult at all! It's a cinch as long as you have the right materials. I dare you to stop at one, it's that addicting. Just be sure to pay attention to the size of the beads and stringing cord before you purchase the supplies. Have fun!",
        category_id=4,
        supplies_text="- 8/0 seed beads, assorted colors (I used frosted innocent pink, frosted cantelope, opaque sunshine, frosted shamrock, frosted turquoise, frosted periwinkle and frosted light beige) - no.8 Griffin silk thread with needle - 3mm brass bead (optional) - no.10 Griffin silk thread or 0.8-1mm Chinese knotting cord (for closure) - scissors - pliers (optional) - materials for other bracelets - freshwater pearls - African beads - Czech beads - 0.5mm elastic string - 11/0 gold seed beads",
        image="react-app/public/images/jewelry/daisy-bracelet/daisychainproject1.jpeg"
    )

    mother_of_pearl_necklace = Project(
        user_id=10,
        title="Mother of Pearl Necklace",
        description="Summer is just weeks away and although we don't quite know what the near future will look like just yet, I'm looking forward for easing up on just about every aspect of life. I recently stumbled upon these adorable mother of pearl charms and the idea of incorporating them into some necklaces tickled me pink. They're just perfect for summer!",
        category_id=4,
        supplies_text="- mother of pearl letter charms - mother of pearl evil eye clover charm - mother of pearl hamsa charm - mother of pearl bows, bunnies and zodiac - ombré gemstone rondelle beads (pink opal, rainbow sapphire, tourmaline and blue sapphires) - freshwater pearls - gold spacer beads - 4mm gold filled crimp bead covers - 6mm closed jump rings - 7 x 12mm lobster clasps - metallic flex wire in gold - 0.5mm waxed cord (for single bead necklaces) - chain nose pliers - crimping tool - scissors - scotch tape",
        image="react-app/public/images/jewelry/mother-of-pearl-necklace/motherofpearlproject1.jpeg"
    )

    shell_necklace = Project(
        user_id=10,
        title="Beaded Shell Necklaces",
        description="Throughout the years, I've collected an endless stands of beads from all over the world - from my jewelry designing days to my present Etsy trolling days. After stumbling upon a few pretty gold shell charms a couple of weeks ago, I knew I had to put some of my favorite beads to good use. After all, is there anything that epitomizes summer more than a layered stack of beaded shell necklaces? I think not . . .",
        category_id=4,
        supplies_text="- gold shell charms (sea star charms, sea shells, cowrie shells) - beads (bone heshi, African record disc heshi beads, Ghana glass beads) - beading cord - crimp beads - gold clasps - gold closed jump rings - bead crimper - embroidery needle - tassels (optional)",
        image="react-app/public/images/jewelry/shell-necklace/shellsproject1.jpg"
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

    db.session.commit()

    def undo_projects():
        db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
        db.session.commit()
