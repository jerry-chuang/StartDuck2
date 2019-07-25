
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activities').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities').insert([
        { id: 1,
          name:  'Buffalo Chicken Sandwiches',
          content: `
          ![Buffalo Chicken Sandwiches](  https://www.thecookierookie.com/wp-content/uploads/2015/09/buffalo-chicken-sandwiches-with-ranch-fried-pickles-6-of-11-500x375.jpg
          )
        
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
        content: `
        ![Chipotle Black Bean and Rice Stew](https://www.camelliabrand.com/static/wp-content/uploads/2015/07/ccc-chipotle-black-bean-soup-720x400.jpg)

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
        content: `
        ![Chorizo Meatloaf](http://muybuenocookbook.com/wp-content/uploads/2014/01/Chorizo-and-Chipotle-Meatloaf1.jpg
        )
        
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
      }
      ]);
    });
};
