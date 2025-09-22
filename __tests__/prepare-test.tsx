import { render } from "@testing-library/react-native";
import Prepare from "@/app/(tabs)/prepare";


// tests below adapted from following youtube video
// https://www.youtube.com/watch?v=VuNPrFH9H0E
describe('Prepare View', () => {
  it('renders correctly', async () => {
    // render the prepare view
    const { getByText, getByTestId, getAllByTestId } = render( <Prepare /> );

    // make sure that the remaining tasks header is shown
    getByText('Remaining Tasks');

    // check that the profile header was rendered
    getByTestId('Prepare.ProfileHeader');

    // check that three checklist buttons are renderd (there's 3 checklists)
    expect(getAllByTestId('Prepare.ChecklistButton').length).toBe(3);
  });
})
