import azkaRest from "@/assets/images/azka_rest_1794065278469.jpg";
import azkaClosed from "@/assets/images/azka_closed_1794065017275.jpg";
import azkaHalf from "@/assets/images/azka_half_1794065019082.jpg";
import azkaLookLeft from "@/assets/images/azka_look_left_1794065021207.jpg";
import azkaLookRight from "@/assets/images/azka_look_right_1794065021556.jpg";
import azkaLookUp from "@/assets/images/azka_look_up_1794065022279.jpg";
import azkaLookDown from "@/assets/images/azka_look_down_1794065023636.jpg";
import azkaLookUpLeft from "@/assets/images/azka_look_upleft_1794065176497.jpg";
import azkaLookUpRight from "@/assets/images/azka_look_upright_1794065177385.jpg";
import azkaLookDownLeft from "@/assets/images/azka_look_downleft_1794065178788.jpg";
import azkaLookDownRight from "@/assets/images/azka_look_downright_1794065178797.jpg";
import azkaWinkLeft from "@/assets/images/azka_wink_left_1794065025391.jpg";
import azkaWinkRight from "@/assets/images/azka_wink_right_1794065025735.jpg";
import azkaKiss from "@/assets/images/azka_kiss_expr_1794064982824.jpg";
import azkaOuch from "@/assets/images/azka_ouch_expr_1794064982643.jpg";
import azkaAngry from "@/assets/images/azka_angry_1794065092647.jpg";
import azkaCross from "@/assets/images/azka_cross_1794065092723.jpg";
import azkaShock from "@/assets/images/azka_shock_1794065093407.jpg";
import azkaLaugh from "@/assets/images/azka_laugh_1794065093696.jpg";
import azkaPuff from "@/assets/images/azka_puff_1794065095308.jpg";
import azkaHearts from "@/assets/images/azka_hearts_1794065097885.jpg";
import azkaGum from "@/assets/images/azka_gum_1794065098387.jpg";
import azkaGumSmall from "@/assets/images/azka_gum_small_1794105610470.jpg";
import azkaGumMedium from "@/assets/images/azka_gum_medium_1794105611635.jpg";
import azkaGumPopped from "@/assets/images/azka_gum_popped_1794105613095.jpg";
import azkaTongue from "@/assets/images/azka_tongue_1794065173571.jpg";
import azkaCry from "@/assets/images/azka_cry_1794065174713.jpg";
import azkaDizzy from "@/assets/images/azka_dizzy_1794065177495.jpg";
import azkaPink from "@/assets/images/azka_pink_1794065099212.jpg";
import azkaBlue from "@/assets/images/azka_blue_1794065100473.jpg";
import azkaBlonde from "@/assets/images/azka_blonde_1794065172228.jpg";

export { azkaRest };

/**
 * Maps every Living Portrait state key directly to a pre-rendered, pixel-aligned
 * 1024x1024 3D portrait of Azka. Zero canvas eye patches or code-drawn overlays
 * are ever composited over her face.
 */
export const PORTRAIT_FRAME_URLS: Record<string, string> = {
  // Resting & blink states
  rest: azkaRest,
  closed: azkaClosed,
  half: azkaHalf,
  deadpan: azkaHalf,

  // 16 compass gaze directions mapped to pixel-aligned 8-way gaze renders
  left: azkaLookLeft,
  wsw: azkaLookDownLeft,
  downleft: azkaLookDownLeft,
  ssw: azkaLookDown,
  down: azkaLookDown,
  sse: azkaLookDown,
  downright: azkaLookDownRight,
  ese: azkaLookDownRight,
  right: azkaLookRight,
  ene: azkaLookUpRight,
  upright: azkaLookUpRight,
  nne: azkaLookUp,
  up: azkaLookUp,
  nnw: azkaLookUp,
  wnw: azkaLookUpLeft,

  // Hover & tap expressions
  winkl: azkaWinkLeft,
  winkr: azkaWinkRight,
  smug: azkaWinkRight,
  kiss: azkaKiss,
  whistle1: azkaKiss,
  whistle2: azkaKiss,
  fish: azkaKiss,
  ouch: azkaOuch,
  scrunch: azkaOuch,
  sneeze2: azkaOuch,
  wind: azkaOuch,
  angry: azkaAngry,
  raised: azkaAngry,
  cross: azkaCross,
  shock: azkaShock,
  scared: azkaShock,
  sneeze1: azkaShock,
  yawn1: azkaHalf,
  yawn2: azkaShock,
  yawn: azkaClosed,
  yawn4: azkaHalf,
  laugh: azkaLaugh,
  grin: azkaLaugh,
  stars: azkaLaugh,
  puff: azkaPuff,
  hearts: azkaHearts,
  shy: azkaLookDown,
  gum1: azkaGumSmall,
  gum2: azkaGumMedium,
  gum3: azkaGum,
  gumpop: azkaGumPopped,
  snore: azkaClosed,
  tongue: azkaTongue,
  cry: azkaCry,
  dizzy: azkaDizzy,
  sick: azkaDizzy,

  // Hijab color variants
  pink: azkaPink,
  blue: azkaBlue,
  blonde: azkaBlonde,
};
