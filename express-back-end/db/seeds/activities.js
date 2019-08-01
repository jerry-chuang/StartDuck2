
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([
        { id: 1,
          name:  'Buffalo Chicken Sandwiches',
          category_id: 2,
          content: 
`![Buffalo Chicken Sandwiches](  https://www.thecookierookie.com/wp-content/uploads/2015/09/buffalo-chicken-sandwiches-with-ranch-fried-pickles-6-of-11-500x375.jpg)

Prep time - 10 minutes

Cook time - 20 minutes

## Ingredients:

* 2 lb of chicken breasts
* some bread product to put the sandwich on (I used onion rolls)
* three cloves of garlic
* about a cup of Frank's Hot Sauce
* 1/2 of a red onion
* 2-3 celery stalks
* 8 oz. of cream cheese
* blue cheese crumbles
* a little paprika and/or cumin
* salt
* pepper

## Directions:

* mince garlic, chop onion finely, and dice the celery and put over low heat
with some olive oil, stirring often
* while the veggies are cooking a little (not really sauteing or browning
hopefully), cube the chicken breast.  Heat through in a large pan.
* after the chicken is cooking, add the hot sauce and spices to the sauce,
and stir through
* when the chicken is about cooked, turn off the heat on the sauce and add the
cream cheese and stir through
* when all of the cream cheese is blended, and the chicken is done, pour the
sauce over the chicken and stir
* cook for another few minutes to blend the flavors a bit
* toast the bread if you want, and spoon the chicken mixture over the bread
and top with blue cheese crumbles`,
          duration: 30,
          before_activity_id: null,
          after_activity_id: null,
        },
  
        { id: 2,      
        name:  'Chipotle Black Bean and Rice Stew',
        category_id: 2,
        content: 
`![Chipotle Black Bean and Rice Stew](https://www.camelliabrand.com/static/wp-content/uploads/2015/07/ccc-chipotle-black-bean-soup-720x400.jpg)

[Likely origin](http://www.grouprecipes.com/427/chipotle-black-bean-and-rice-stew.html)

## Ingredients

* 1 cup white rice
* 2 (15 ounce) cans black beans
* 1 cup frozen white corn kernels
* 1 (32 ounce) carton vegetable stock
* 2 Knorr Chipotle Bouillon cubes (or 1-2 well-minced canned chipotle peppers)
* 1 (15 ounce) can diced tomatoes
* 1 (8 ounce) can tomato sauce
* 2 celery ribs, chopped
* 1 cup sweet white onion or white, minced
* 3 cloves garlic, chopped
* 2 tsp chili powder
* 1 tsp ground coriander
* 1 1/2 tsp cumin
* 1 bay leaf
* 2 tbsp olive oil


## Directions

1. Put a large pot over medium heat.
1. Put in olive oil and saute your bay leaf, celery, onions, and garlic for
about 4 minutes.
1. Crumble up your chipotle cubes into the pot and add corn as well as 2 cans
of undrained black beans.
1. Add chili powder, cumin, and coriander. Stir this well.
1. Add in tomato sauce, tomatoes and stock.
1. Cover the pot and bring to high-heat and a boil.
1. Now add rice and bring back to a boil again. Then lower heat, cover, and
let simmer until the rice is tender.`,
        duration: 60,
        before_activity_id: null,
        after_activity_id: null,
      },

      { id: 3,  
        name:  'Chorizo Meatloaf',
        category_id: 2,
        content: 
`![Chorizo Meatloaf](http://muybuenocookbook.com/wp-content/uploads/2014/01/Chorizo-and-Chipotle-Meatloaf1.jpg)

## Meatloaf

- ~1 lb ground beef
- ~0.5 lb chorizo out of casing
- carrot, food processor
- garlic
- medium onion (save 1/4 for glaze)
- 1 poblano chile, food processor
- salt, pepper
- 1/2 tsp cumin
- 1 chipotle chile in adobo sauce, blended
- a little cilantro
- egg
- a little cayenne pepper
- a little worcestershire
- smoked paprika

## Glaze

Blend all of these

- 1 chipotle chile in adobo sauce
- 1 can of tomatoes
- juice of 1 lime
- 1/2 teaspoon ground allspice
- 2 cloves garlic
- serrano chili

Bake in oven at 350 degrees until cooked

Green onion garnish

## Notes

Flavor is good but was too spicy. Even with not adding the Chipotle chile to the meat.`,
        duration: 120,
        before_activity_id: null,
        after_activity_id: null,
      },

      { id: 4,  
        name:  'Shoyu-based chicken broth ramen',
        category_id: 2,
        content: 
`![Shoyu-based chicken broth ramen](https://pbs.twimg.com/media/DvZQrF5UYAA8yuv?format=jpg&name=small)

## Chicken broth

### Dashi

1. Put Konbu in 1L water for 30 minutes.
1. Put Niboshi and boil with low heat until the water is boiling.
1. Take Konbu off.
1. Removing a scum, keep boiling water for 10 minutes.

### Chicken broth

1. For now, using [POPLA International Torigara Stock Paste](https://www.popla.com/new-products/torigara-stock-paste).

> NOTE: This step will be replaced with a real chicken process in a future version.

## Flavored egg

### Half-boiled egg

1. Put eggs in a refrigerator for a while.
1. Take eggs into boiled water for exactly 7 minutes.
1. Take eggs off and put in cold water.

### Flavoring

1. Mix Dashi soup 20 ml, Shoyu 40 ml, Mirin 40 ml and put in a Ziplock.
1. Put the half-boiled egg in the Ziplock.
1. Put the Ziplock bag in a refrigerator at least for 30 minutes.

> NOTE: **DO NOT** keep eggs in Ziplock with soup longer than a few hours, or these eggs would be too much flavor.

## Sauce

### Shoyu sauce

1. Put Shoyu 100 ml, Mirin 100 ml, Sake 25 ml, Konbu, Niboshi into a pan.
1. Boil it until it has bubbles.
1. Take Konbu and Niboshi off.
1. Put sauce into a bowl.

### Flavored oil

1. Put canola oil, Niboshi, Konbu, Katsuobushi, and chopped white part of green onions into a pan.
1. Fry them until green onions turn to brown.
1. Filter oil with a net into a bowl.

## Chashu

1. Put water 300 ml, Sake 150 ml, sliced gingers, sliced garlic, green part of green onions into a pot.
1. Put chopped pork libs 200 g to the pot.
1. Boil it with high heat until water is boiling.
1. Reduce heat to mid-level and boil it for 10 minutes.
1. Put a lid on a pot and boil it for 10 minutes.
1. Stop the heat and keep it for 30 minutes.
1. Put Shoyu sauce and pork libs into a Ziplock.
1. Put the Ziplock bag in a refrigerator at least for 30 minutes.

> NOTE: It would be better to keep it in a refrigerator for more extended hours, can be overnight.

## Greens

1. Boil enough water with small amount of salt in a pot.
1. Put spinach into the pot and boil for 1.5 minutes.
1. Take spinach out and put in cold water.
1. Drain water and cut them in small chunks.

## Noodles

1. Mix 70 ml cold water with 2g of salt, 20 ml boiled water with 2 g of baking soda.
1. Mix it with bread flour 250 g and make a dough.
1. Cut it and make noodles about 70 cm long.

To run these steps, I was using [Philips HR2371/05 Compact Pasta Maker](https://amzn.to/2CBEhJt). This machine produces relatively thick noodles with out-of-box configuration, which requires for about 4 minutes boiling.

## Ramen

1. Put Dashi in a bowl 300 ml, and dissolve chicken broth paste 3 ml.
1. Put Shoyu sauce and flavored oil.
1. Put cooked noodles
1. Put a flavored egg.
1. Put a few sliced Chashu.
1. Put a chink of spinach.
1. Taste and fun.`,
        duration: 60,
        before_activity_id: null,
        after_activity_id: null,
      },
      { id: 5,  
        name:  'Crab salad',
        category_id: 2,
        content: 
`![crab salad](https://champagne-tastes.com/wp-content/uploads/2017/08/king-crab6-small-1-1.jpg)

##### In a medium bowl, combine:

- 1 pound **lump crabmeat**
- 1 stalk **celery**, diced
- 4 teaspoons fresh **chives**, finely sliced
- 1 teaspoon fresh **tarragon** leaves, minced
- 70 grams (~1/3 cup) **mayonnaise**
- 40 grams (~3 tablespoons) **sour cream**
- 1 tablespoon **lemon** juice
- 1 teaspoon **Colman's mustard** powder mustard
- Kosher salt and freshly ground black pepper

Serve immediately, or refrigerate up to two days, with:

***Whole wheat crackers**`,
        duration: 30,
        before_activity_id: null,
        after_activity_id: null,
      },
      { id: 6,  
        name:  'Brussels Sprouts',
        category_id: 2,
        content: 
`This recipe is based on [Food Network's publication](http://www.foodnetwork.com/recipes/fried-brussels-sprouts-with-walnuts-and-capers-recipe/index.html) of Michael Symon's recipe for the Brussel's sprouts he serves at [Lolita](http://lolitarestaurant.com/) in Cleveland, OH.

![Deep fried Brussels sprouts](https://keviniscooking.com/wp-content/uploads/2014/07/Honey-Balsamic-Roasted-Brussels-Sprouts-square.jpg)

Pour enough oil into a medium pot so that the oil comes 3 inches up the sides. Heat the oil to 350 degrees.

- Canola oil, for deep-frying

Whisk together in a bowl large enough to toss all of the Brussels sprouts:

- 1 clove garlic, minced
- 4 salt-packed anchovy fillets, rinsed, filleted and minced
- 1 serrano chile, seeded and minced
- 1/4 cup red wine vinegar
- 1 tablespoon honey
- 2 scallions, white and green parts, thinly sliced on the bias
- 1/4 cup walnut pieces, toasted and coarsely chopped
- 1/2 cup extra-virgin olive oil

Working in batches, deep-fry the Brussels sprouts until the edges begin to curl and brown, about 3 minutes.

- 1 pound Brussels sprouts, trimmed and quartered lengthwise

To the last batch, add and stand back (the capers will pop and sputter!):

- 2 cups loosely packed flat-leaf parsley leaves
- 2 tablespoons salt-packed capers, rinsed and patted dry

When the color of the parsley becomes a deeper, more saturated shade of green, about 30 seconds to 1 minute, remove the contents of the pot with a skimmer and place directly in the bowl of dressing. Toss to coat. Season to taste.

- Kosher salt and freshly ground black pepper`,
        duration: 30,
        before_activity_id: null,
        after_activity_id: null,
      },
      { id: 7,  
        name:  'Greek salad',
        category_id: 2,
        content: 
`![Greek salad](https://www.jessicagavin.com/wp-content/uploads/2018/02/greek-salad-2-1200-500x500.jpg)

[Source](http://www.foodnetwork.com/recipes/ina-garten/greek-salad-recipe.html)

Vinaigrette
-----------

In a small bowl, whisk together:

- 3 cloves garlic, minced
- 1 teaspoon dried oregano
- 1/2 teaspoon Dijon mustard
- 1/4 cup good red wine vinegar
- 1 teaspoon kosher salt
- 1/2 teaspoon freshly ground black pepper

While whisking, slowly add to make an emulsion:

- 1/2 cup good olive oil

Salad
-----

In a large bowl, combine and toss lightly:

- 1 hothouse cucumber, unpeeled, seeded, and sliced 1/4-inch thick
- 1 red bell pepper, large-diced
- 1 yellow bell pepper, large-diced
- 1 pint cherry or grape tomatoes, halved
- 1/2 red onion, sliced in half-rounds
- 1/2 pound feta cheese block, 1/2-inch diced
- 1/2 pound feta cheese, crumbled
- 1/2 cup kalamata olives, pitted
- Vinaigrette

Set aside for 30 minutes to allow the flavors to blend. Serve at room temperature.`,
        duration: 60,
        before_activity_id: null,
        after_activity_id: null,
      },
      { id: 8,  
        name:  'Chicken and dumplings',
        category_id: 2,
        content:         
`![Chicken and dumplings](https://spicysouthernkitchen.com/wp-content/uploads/chicken-and-dumplings-3.jpg)

Season and dredge both sides:

- 4 chicken thighs
- Salt and pepper
- 1/2 cup all-purpose flour

In two batches, brown chicken on both sides and remove to a clean plate:

- Chicken
- 2 tablespoons butter
- 2 tablespoons olive oil

In the same pot, saute over medium-low heat (about 3-4 minutes):

- 1/2 cup carrots, diced
- 1/2 cup celery, diced
- 1 whole medium onion, diced

Add to combine, cover and simmer for 20 minutes:

- Chicken
- 1/2 teaspoon ground thyme
- 1/4 teaspoon turmeric
- 6 cups low sodium chicken broth [cut sauce in half?]
- 1/2 cup apple cider [cut sauce in half?]

While chicken is simmering, make the dough for the dumplings by sifting together all dry ingredients, adding  half-and-half, and stirring gently to combine. Set aside.

[cut dumpling quantity in half?]

- 1-1/2 cup all-purpose flour
- 1/2 cup yellow cornmeal [Ashley doesn't like the corn meal]
- 1 tablespoon baking powder
- 1 teaspoon kosher salt
- 1 1/2 cup half-and-half

Remove chicken from pot and shred it. Add to combine, then simmer for 15 minutes:

- Shredded chicken, skins discarded
- 1/2 cup heavy cream [cut sauce in half?]
- Dumpling dough, roughly formed into tablespoon-sized balls
- 2 tablespoons fresh parsley, minced
- Kosher salt

Allow to sit for 10 minutes before serving.`,
        duration: 60,
        before_activity_id: null,
        after_activity_id: null,
      },

      { id: 9,  
        name:  'Awsome Japanese',
        category_id: 1,
        content:         
`# Contents

- [Awesome Japanese](#awesome-japanese)
    - [Beginner Guide](#beginner-guide)
    - [Textbook](#textbook)
    - [Course](#course)
    - [Hiragana & Katakana](#hiragana-and-katakana)
    - [Kanji](#kanji)
    - [Vocabulary](#vocabulary)
    - [Grammar](#grammar)
    - [Reading](#reading)
    - [Listening](#listening)
    - [Community](#community)
    - [Video](#video)
    - [Dictionary](#dictionary)
  - [Software](#software)

## Beginner Guide

**__New to Japanese?__** Start here!

1. All beginners should start with one of the guides below (one of the top two are the best in my personal opinion).

  * [Starter's Guide](https://www.reddit.com/r/LearnJapanese/wiki/index/startersguide) - from /r/learnjapanese subreddit.
  * [DJT guide](https://djtguide.neocities.org/guide.html) - A well-written guide
  * [All Japanese All The Time (Overview/Timeline)](https://www.youtube.com/watch?v=9PdPOxiWWuU) - For people willing to completely immerse themselves in Japanese.
  * [Japanese Walkthrough](http://japaneselevelup.com/japanese-quest-walkthrough/) - A visual learning guide.
  * [Nukemarine's Suggested Guide for Beginners](https://forum.koohii.com/thread-5110.html) - A roadmap aimed at people involved in a career where one can only spare 1 to 2 hours a day for study.
  * [Grammar Guide to Japanese](http://www.guidetojapanese.org/learn/grammar) - By Tae Kim (this is a work in progress/not yet complete).

2. A summary of the guides is basically this:  first, learn hiragana and katakana using the links in [Hiragana/Katkana](#hiragana-and-katakana) section further down this page.  The Tofugu links is a good starting place.

3. Next is grammar/vocabulary.  You can either use a structured textbook or a more free-form online grammar guide like Tae-Kim.  Either one works, try one or both and stick with the one you like the best.

  For vocabulary, three nice options are [Wanikani](https://www.wanikani.com/), [Memrise](https://www.memrise.com/), or [Anki](https://djtguide.neocities.org/anki.html).  If you go with the Anki route, consider [using this deck](https://docs.google.com/document/d/1zyyuiWkiz2IF2CCROeJebl8mgRdHBqNfS5D7MFjDTzE/edit), which is the same as the deck in the above link, but with the front and back flipped around to display sentences on the front rather than single words, as this will force you to learn words in context.

  For translation, try to avoid Google Translate.  Instead pick another one from the [Dictionary](#dictionary) list.

4. That's it.  There are many, many paths to learning Japanese.  The most important thing is to choose the one you enjoy.  If you don't enjoy your study, you won't succeed, so keep searching until you find the resource or study method that you enjoy.  Look through all the resources below, ask someone if you need help, and good luck.

## Textbook

*Textbooks provides you with a structured learning material.*`,
        duration: 30,
        before_activity_id: null,
        after_activity_id: null,
      }
      
      ]);
    });
};
