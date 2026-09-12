import HookScene, { CompanyScene, ConversationScene, AppraisalScene, OfficeScene, DilemmaScene } from './StoryScenes';
import CharactersScene from './CharactersScene';
import DecisionScene from './DecisionScene';
import { TeamScene, LaborScene, EndScene } from './CreditsScenes';
import { story } from '../data/storyData';
export default function SceneRouter(props) {
  switch(props.state.scene) {
    case 1: return <HookScene/>;
    case 2: return <CharactersScene {...props}/>;
    case 3: return <CompanyScene dispatch={props.dispatch}/>;
    case 4: return <ConversationScene {...props}/>;
    case 5: return <DecisionScene {...props} data={story.firstDecision}/>;
    case 6: return <AppraisalScene {...props}/>;
    case 7: return <OfficeScene {...props}/>;
    case 8: return <DecisionScene {...props} data={story.finalDecision} final/>;
    case 9: return <DilemmaScene/>;
    case 10: return <TeamScene/>;
    case 11: return <LaborScene/>;
    case 12: return <EndScene {...props}/>;
    default: return null;
  }
}

