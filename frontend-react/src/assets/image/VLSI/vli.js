// Hero and background
import heroChip from "./hero_chip.webp";
import vlsiBlueprintBg from "./vlsi_blueprint_bg.webp";
import semiconductorBrochure from "./semiconductor_brochure.webp";

// Chip Card Hovers
import chipCardAHover from "./chip_card_a_hover.webp";
import chipCardBHover1 from "./chip_card_b_hover1.webp";
import chipCardCHover from "./chip_card_c_hover.webp";
import chipCardDHover from "./chip_card_d_hover.webp";
import chipCardEHover from "./chip_card_e_hover.webp";
import chipCardFHover2 from "./chip_card_f_hover2.webp";
import chipCardGHover from "./chip_card_g_hover.webp";
import chipCardHHover from "./chip_card_h_hover.webp";
import chipCardIHover from "./chip_card_i_hover.webp";
import chipCardJHover1 from "./chip_card_j_hover1.webp";
import chipCardKHover from "./chip_card_k_hover.webp";
import chipCardLHover from "./chip_card_l_hover.webp";

// S images (s1 to s12)
import s1 from "./s1.webp";
import s2 from "./s2.webp";
import s3 from "./s3.webp";
import s4 from "./s4.webp";
import s5 from "./s5.webp";
import s6 from "./s6.webp";
import s7 from "./s7.webp";
import s8 from "./s8.webp";
import s9 from "./s9.webp";
import s10 from "./s10.webp";
import s11 from "./s11.webp";
import s12 from "./s12.webp";

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
  "chip_card_a_hover.webp": chipCardAHover,
  "chip_card_b_hover1.webp": chipCardBHover1,
  "chip_card_c_hover.webp": chipCardCHover,
  "chip_card_d_hover.webp": chipCardDHover,
  "chip_card_e_hover.webp": chipCardEHover,
  "chip_card_f_hover2.webp": chipCardFHover2,
  "chip_card_g_hover.webp": chipCardGHover,
  "chip_card_h_hover.webp": chipCardHHover,
  "chip_card_i_hover.webp": chipCardIHover,
  "chip_card_j_hover1.webp": chipCardJHover1,
  "chip_card_k_hover.webp": chipCardKHover,
  "chip_card_l_hover.webp": chipCardLHover,
  "hero_chip.webp": heroChip,
  "semiconductor_brochure.webp": semiconductorBrochure,
  "vlsi_blueprint_bg.webp": vlsiBlueprintBg,
  "s1.webp": s1,
  "s2.webp": s2,
  "s3.webp": s3,
  "s4.webp": s4,
  "s5.webp": s5,
  "s6.webp": s6,
  "s7.webp": s7,
  "s8.webp": s8,
  "s9.webp": s9,
  "s10.webp": s10,
  "s11.webp": s11,
  "s12.webp": s12,
};

export const getImageUrl = (fileName) => filenameMap[fileName] || "";

export default images;
