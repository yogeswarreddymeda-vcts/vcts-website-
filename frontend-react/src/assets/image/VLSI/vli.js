// Hero and background
import heroChip from "./hero_chip.png";
import vlsiBlueprintBg from "./vlsi_blueprint_bg.png";
import semiconductorBrochure from "./semiconductor_brochure.jpg";

// Chip Card Hovers
import chipCardAHover from "./chip_card_a_hover.png";
import chipCardBHover1 from "./chip_card_b_hover1.png";
import chipCardCHover from "./chip_card_c_hover.png";
import chipCardDHover from "./chip_card_d_hover.png";
import chipCardEHover from "./chip_card_e_hover.png";
import chipCardFHover2 from "./chip_card_f_hover2.png";
import chipCardGHover from "./chip_card_g_hover.png";
import chipCardHHover from "./chip_card_h_hover.png";
import chipCardIHover from "./chip_card_i_hover.png";
import chipCardJHover1 from "./chip_card_j_hover1.png";
import chipCardKHover from "./chip_card_k_hover.png";
import chipCardLHover from "./chip_card_l_hover.png";

// S images (s1 to s12)
import s1 from "./s1.png";
import s2 from "./s2.png";
import s3 from "./s3.png";
import s4 from "./s4.png";
import s5 from "./s5.png";
import s6 from "./s6.png";
import s7 from "./s7.png";
import s8 from "./s8.png";
import s9 from "./s9.png";
import s10 from "./s10.png";
import s11 from "./s11.png";
import s12 from "./s12.png";

const images = {
  heroChip,
  vlsiBlueprintBg,
  semiconductorBrochure,

  chipCardAHover,
  chipCardBHover1,
  chipCardCHover,
  chipCardDHover,
  chipCardEHover,
  chipCardFHover2,
  chipCardGHover,
  chipCardHHover,
  chipCardIHover,
  chipCardJHover1,
  chipCardKHover,
  chipCardLHover,

  s1,
  s2,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
  s10,
  s11,
  s12
};

const filenameMap = {
  "chip_card_a_hover.png": chipCardAHover,
  "chip_card_b_hover1.png": chipCardBHover1,
  "chip_card_c_hover.png": chipCardCHover,
  "chip_card_d_hover.png": chipCardDHover,
  "chip_card_e_hover.png": chipCardEHover,
  "chip_card_f_hover2.png": chipCardFHover2,
  "chip_card_g_hover.png": chipCardGHover,
  "chip_card_h_hover.png": chipCardHHover,
  "chip_card_i_hover.png": chipCardIHover,
  "chip_card_j_hover1.png": chipCardJHover1,
  "chip_card_k_hover.png": chipCardKHover,
  "chip_card_l_hover.png": chipCardLHover,
  "hero_chip.png": heroChip,
  "semiconductor_brochure.jpg": semiconductorBrochure,
  "vlsi_blueprint_bg.png": vlsiBlueprintBg,
  "s1.png": s1,
  "s2.png": s2,
  "s3.png": s3,
  "s4.png": s4,
  "s5.png": s5,
  "s6.png": s6,
  "s7.png": s7,
  "s8.png": s8,
  "s9.png": s9,
  "s10.png": s10,
  "s11.png": s11,
  "s12.png": s12,
};

export const getImageUrl = (fileName) => filenameMap[fileName] || "";

export default images;
