import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
    selectedOption: "",
    name: "",
    employeeCode: "",
    designation: "",
    dateOfJoining: "",
    appraisalDueDate: "",
    department: "",
    reportingManager: "",
    reviewer: "",
    exactPrevExp: "",
    focusRExp: "",
    totalExp: "",
    performanceReviewPeriod: "",
    understandingRoles: "",
    lastYearAccomplishments: "",
    strengths: "",
    developmentNeeds: "",
    attendanceAndPunctuality: "",
    technicalSkills: "",
    qualityOfWork: "",
    newKnowledge: "",
    utilizationAndProductivity: "",
    timeManagementAndOrganizationalSkills: "",
    interpersonalSkills: "",
    communication: "",
    initiativeInnovationAndCreativity: "",
    teamwork: "",
    clientFocused: "",
    planningAndOrganizationalSkills: "",
    valueAddition: "",
    top3Likes: "",
    top3Dislikes: "",
    suggestionsForImprovement: "",
    futureWork: "",
    actionsForIndispensability: "",
    exploreSkills: "",
    trainingNeeds: "",
    selfRating: "",
  });

  const { token } = useParams();
  const [response1, setResponse1] = useState({});
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://invoicezapi.focusrtech.com:57/user/form-links/${token}`,
        );
        setResponse1(response.data); // Assuming response.data contains the necessary data
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, [change]); // Include token in the dependency array

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, selectedOption: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("Error fetching data:", response1);

      const response = await axios.put(
        `https://invoicezapi.focusrtech.com:57/user/handleSubmitted/${response1.tokens}`,
        formData,
      );
      setChange(true);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return !response1.submitted ? (
    <div
      style={{
        backgroundColor: "#f5e1d3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#b09280",
          marginTop: "3vh",
          marginBottom: "3vh",
          width: "fit-content",
          marginBottom: "3vh",
          borderRadius: "10px",
          paddingTop: "1.5%",
          paddingBottom: "1.5%",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Typography variant="h3" align="center">
          FOCUSR APPRAISAL - FORM
        </Typography>
      </div>
      <Container
        sx={{
          width: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Add more input fields for other questions similarly */}
          <div>
            <Typography variant="subtitle1">Employee Code:</Typography>
            <TextField
              fullWidth
              name="employeeCode"
              placeholder="Enter your Employee Code"
              value={response1.employee_id}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Designation:</Typography>
            <TextField
              fullWidth
              name="designation"
              placeholder="Enter your Designation"
              value={formData.designation}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Date of Joining:</Typography>
            <TextField
              fullWidth
              name="dateOfJoining"
              placeholder="Enter your Date of Joining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          {/* Continue adding input fields for other questions in a similar manner */}
          <div>
            <Typography variant="subtitle1">Appraisal Due date:</Typography>
            <TextField
              fullWidth
              name="appraisalDueDate"
              value={formData.appraisalDueDate}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Department:</Typography>
            <TextField
              fullWidth
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Reporting Manager:</Typography>
            <TextField
              fullWidth
              name="reportingManager"
              value={formData.reportingManager}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Reviewer:</Typography>
            <TextField
              fullWidth
              name="reviewer"
              value={formData.reviewer}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          {/* Add remaining input fields for other questions */}
          <div>
            <Typography variant="subtitle1">
              Exact Previous Relevant Experience in domain (Before Joining
              FocusR - in years):
            </Typography>
            <TextField
              fullWidth
              name="exactPrevExp"
              value={formData.exactPrevExp}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Exact experience in FocusR (in years):
            </Typography>
            <TextField
              fullWidth
              name="focusRExp"
              value={formData.focusRExp}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Appropriate Total experience (in years):
            </Typography>
            <TextField
              fullWidth
              name="totalExp"
              value={formData.totalExp}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Performance Review Period:
            </Typography>
            <TextField
              fullWidth
              name="performanceReviewPeriod"
              value={formData.performanceReviewPeriod}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Team Member to state your understanding of your roles and
              responsibilities / objectives as agreed in last year’s appraisal /
              during joining. Managers to review and comment on the same:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="understandingRoles"
              value={formData.understandingRoles}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          {/* Add remaining input fields for other questions */}
          <div>
            <Typography variant="subtitle1">
              Last Year’s Accomplishments:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="lastYearAccomplishments"
              value={formData.lastYearAccomplishments}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Strengths:</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="strengths"
              value={formData.strengths}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">Development Needs:</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="developmentNeeds"
              value={formData.developmentNeeds}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Team Member / Manager: Rating Performance Description
            </Typography>
            {/* Question 1: Attendance & Punctuality */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Attendance & Punctuality</InputLabel>
              <Select
                name="attendanceRating"
                value={formData.attendanceRating}
                onChange={handleSelectChange}
                label="Attendance & Punctuality"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            {/* Question 2: Technical Skills */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Technical Skills</InputLabel>
              <Select
                name="technicalSkillsRating"
                value={formData.technicalSkillsRating}
                onChange={handleSelectChange}
                label="Technical Skills"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Utilization and Productivity</InputLabel>
              <Select
                name="utilizationProductivityRating"
                value={formData.utilizationProductivityRating}
                onChange={handleSelectChange}
                label="Utilization and Productivity"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            {/* Question 6: Time Management & Organizational Skills */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Time Management & Organizational Skills</InputLabel>
              <Select
                name="timeManagementOrganizationalSkillsRating"
                value={formData.timeManagementOrganizationalSkillsRating}
                onChange={handleSelectChange}
                label="Time Management & Organizational Skills"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Interpersonal Skills</InputLabel>
              <Select
                name="interpersonalSkillsRating"
                value={formData.interpersonalSkillsRating}
                onChange={handleSelectChange}
                label="Interpersonal Skills"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            {/* Question 8: Communication - Verbal & Written */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Communication - Verbal & Written</InputLabel>
              <Select
                name="communicationRating"
                value={formData.communicationRating}
                onChange={handleSelectChange}
                label="Communication - Verbal & Written"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Initiative, Innovation & Creativity</InputLabel>
              <Select
                name="innovationCreativityRating"
                value={formData.innovationCreativityRating}
                onChange={handleSelectChange}
                label="Initiative, Innovation & Creativity"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            {/* Question 10: Teamwork */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Teamwork</InputLabel>
              <Select
                name="teamworkRating"
                value={formData.teamworkRating}
                onChange={handleSelectChange}
                label="Teamwork"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Client Focused</InputLabel>
              <Select
                name="clientFocusedRating"
                value={formData.clientFocusedRating}
                onChange={handleSelectChange}
                label="Client Focused"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            {/* Question 12: Planning and Organizational Skills */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Planning and Organizational Skills</InputLabel>
              <Select
                name="planningOrganizationalSkillsRating"
                value={formData.planningOrganizationalSkillsRating}
                onChange={handleSelectChange}
                label="Planning and Organizational Skills"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Value Addition</InputLabel>
              <Select
                name="valueAdditionRating"
                value={formData.valueAdditionRating}
                onChange={handleSelectChange}
                label="Value Addition"
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value="O">Outstanding</MenuItem>
                <MenuItem value="E">Exceeds expectations</MenuItem>
                <MenuItem value="M">Meets expectations</MenuItem>
                <MenuItem value="NI">Needs improvement</MenuItem>
                <MenuItem value="U">Unacceptable</MenuItem>
              </Select>
            </FormControl>

            {/* Continue adding dropdowns for other questions similarly */}
          </div>

          {/* Add remaining input fields for other questions */}
          <div>
            <Typography variant="subtitle1">
              Top 3 likes in the organization:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="top3Likes"
              value={formData.top3Likes}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Top 3 dislikes in the organization:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="top3Dislikes"
              value={formData.top3Dislikes}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Any Suggestion to Improve the organisation:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="suggestionsForImprovement"
              value={formData.suggestionsForImprovement}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              List the kind of work or job would you like to be doing in
              one/two/five years time:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="futureWork"
              value={formData.futureWork}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              List the actions you have taken to make yourself indispensable:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="actionsForIndispensability"
              value={formData.actionsForIndispensability}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Do you want to explore your skills areas other than your present
              work?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="exploreSkills"
              value={formData.exploreSkills}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              What sort of training/experiences would benefit you in the next
              year?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="trainingNeeds"
              value={formData.trainingNeeds}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <Typography variant="subtitle1">
              Self Rating (out of 10):
            </Typography>
            <TextField
              fullWidth
              name="selfRating"
              value={formData.selfRating}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </div>
          {/* Add remaining input fields for other questions */}

          <div style={{ marginBottom: "2vh", marginTop: "2vh" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="subtitle1">{`you have already Submitted the Form :-)`}</Typography>
    </div>
  );
};

export default FormPage;
