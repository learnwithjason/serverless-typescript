import { HandlerEvent } from '@netlify/functions';

type Pizza = {
  type: 'pizza';
  sauce: 'red' | 'white';
  /**
   * Things like pepperoni, mushrooms, etc.
   */
  toppings?: string[];
};

type HotDog = {
  type: 'hotdog';
  /**
   * @deprecated all hot dogs are now footlong
   */
  size: 'ball park' | 'footlong';
  /**
   * Things like relish, onions, etc.
   */
  toppings?: string[];
};

type Taco = {
  type: 'taco';
  spiceLevel: 'none' | 'mild' | 'hot';
  /**
   * Things like salsa, cheese, etc.
   */
  toppings?: string[];
};

type Sandwich = Pizza | HotDog | Taco;

function serveSandwich(sandwich: Sandwich): string {
  switch (sandwich.type) {
    case 'pizza':
      sandwich.toppings;
      return `Pizza with ${sandwich.sauce} sauce`;

    case 'hotdog':
      sandwich.toppings;
      return `Hot dog with ${sandwich.size} size`;

    case 'taco':
      sandwich.toppings;
      return `Taco with ${sandwich.spiceLevel} spice`;

    // this is not reachable due to TS checks
    default:
      throw new Error('this should never happen');
  }
}

export const handler = async (event: HandlerEvent) => {
  try {
    const type = event?.queryStringParameters?.type || 'pizza';

    const pizza: Pizza = {
      type: 'pizza',
      sauce: 'red',
    };
    const hotdog: HotDog = {
      type: 'hotdog',
      size: 'ball park',
    };
    const taco: Taco = {
      type: 'taco',
      spiceLevel: 'hot',
    };

    const sandwich =
      type === 'pizza' ? pizza : type === 'hotdog' ? hotdog : taco;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: serveSandwich(sandwich) }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
