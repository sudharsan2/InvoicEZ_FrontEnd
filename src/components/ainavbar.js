import React from "react";
import { DrawerProps } from "@fluentui/react-components";
import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from "@fluentui/react-nav-preview";
import {
  Label,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  makeStyles,
  tokens,
  useId,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

// Icons for navigation items
const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular
);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
  PreviewLink20Filled,
  PreviewLink20Regular
);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular
);

const AiNav = (props) => {
  const styles = useStyles();

  const typeLableId = useId("type-label");
  const linkLabelId = useId("link-label");
  const multipleLabelId = useId("multiple-label");

  const [isOpen, setIsOpen] = React.useState(true);
  const [enabledLinks, setEnabledLinks] = React.useState(true);
  const [type, setType] = React.useState("inline");
  const [isMultiple, setIsMultiple] = React.useState(true);

  

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  // Create a simple divider as an alternative to NavDivider
  const Divider = () => (
    <div
      style={{
        height: "1px",
        backgroundColor: "#e1e1e1",
        margin: "8px 0",
      }}
    />
  );

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={isMultiple}
        style={{backgroundColor:"#fff"}}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavDrawerBody>
          {/* <AppItem
            icon={<PersonCircle32Regular />}
            as="a"
            href={linkDestination}
          >
            Contoso HR
          </AppItem> */}
          <NavItem   value="1" style={{backgroundColor:"#fff",cursor:"pointer"}}>
            PO-81234
          </NavItem>
          <NavItem value="2"  style={{backgroundColor:"#fff",cursor:"pointer"}}>
          PO-81234
          </NavItem>
          <NavItem
            value="3"
            style={{backgroundColor:"#fff",cursor:"pointer"}}
          >
            PO-81234
          </NavItem>
         
        </NavDrawerBody>
      </NavDrawer>
      {/* <div className={styles.content}>
        {!isOpen && renderHamburgerWithToolTip()}
        <div className={styles.field}>
          <Label id={typeLableId}>Type</Label>
          <RadioGroup
            value={type}
            onChange={(_, data) => setType(data.value)}
            aria-labelledby={typeLableId}
          >
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
          <Label id={linkLabelId}>Links</Label>
          <Switch
            checked={enabledLinks}
            onChange={(_, data) => setEnabledLinks(!!data.checked)}
            label={enabledLinks ? "Enabled" : "Disabled"}
            aria-labelledby={linkLabelId}
          />

          <Label id={multipleLabelId}>Categories</Label>
          <Switch
            checked={isMultiple}
            onChange={(_, data) => setIsMultiple(!!data.checked)}
            label={isMultiple ? "Multiple" : "Single"}
            aria-labelledby={multipleLabelId}
          />
        </div>
      </div> */}
    </div>
  );
};

export default AiNav;
