import { PromptTemplate } from '../types';
import { FIGMA_MCP_TEMPLATES } from './templates/figmaMcp';
import { CLI_FILESYSTEM_EMAIL_TEMPLATES } from './templates/cliFilesystemEmail';
import { UI_UX_DESIGN_TEMPLATES } from './templates/uiUxDesign';
import { WEBDESIGN_APPS_TEMPLATES } from './templates/webdesignApps';
import { BLENDER_3D_TEMPLATES } from './templates/blender3d';
import { PHOTO_IMAGES_TEMPLATES } from './templates/photoImages';
import { MOCKUPS_PACKAGING_TEMPLATES } from './templates/mockupsPackaging';
import { AI_WORKFLOWS_TEMPLATES } from './templates/aiWorkflows';
import { VIBE_CODING_TEMPLATES } from './templates/vibeCoding';
import { ADOBE_SUITE_TEMPLATES } from './templates/adobeSuite';
import { MOTION_ANIMATION_TEMPLATES } from './templates/motionAnimation';
import { BRAND_IDENTITY_TEMPLATES } from './templates/brandIdentity';
import { IDEAMAKING_TEMPLATES } from './templates/ideamaking';
import { PRINT_PREPRESS_TEMPLATES } from './templates/printPrepress';

export const DEFAULT_TEMPLATES: PromptTemplate[] = [
  ...FIGMA_MCP_TEMPLATES,
  ...CLI_FILESYSTEM_EMAIL_TEMPLATES,
  ...UI_UX_DESIGN_TEMPLATES,
  ...WEBDESIGN_APPS_TEMPLATES,
  ...BLENDER_3D_TEMPLATES,
  ...PHOTO_IMAGES_TEMPLATES,
  ...MOCKUPS_PACKAGING_TEMPLATES,
  ...AI_WORKFLOWS_TEMPLATES,
  ...VIBE_CODING_TEMPLATES,
  ...ADOBE_SUITE_TEMPLATES,
  ...MOTION_ANIMATION_TEMPLATES,
  ...BRAND_IDENTITY_TEMPLATES,
  ...IDEAMAKING_TEMPLATES,
  ...PRINT_PREPRESS_TEMPLATES
];
