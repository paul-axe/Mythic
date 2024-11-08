import React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import MythicTextField from '../../MythicComponents/MythicTextField';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import {HexColorInput, HexColorPicker} from 'react-colorful';
import {useMythicSetting, SetMythicSetting} from "../../MythicComponents/MythicSavedUserSetting";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import MythicStyledTableCell from "../../MythicComponents/MythicTableCell";

const interactTypeOptions = [
    {value: "interact", display: "Accordions"},
    {value: "interactSplit", display: "Split View"},
    {value: "interactConsole", display: "Console Like"}
];
export function SettingsOperatorUIConfigDialog(props) {
    const me = props.me;
    const initialLocalStorageInteractType = useMythicSetting({setting_name: 'interactType', default_value: "interact", output: "string"});
    const [interactType, setInteractType] = React.useState(initialLocalStorageInteractType);

    const localStorageFontSize = localStorage.getItem(`${me?.user?.user_id || 0}-fontSize`);
    const initialLocalStorageFontSizeValue = localStorageFontSize === null ? 12 : parseInt(localStorageFontSize);
    const localStorageFontFamily = localStorage.getItem(`${me?.user?.user_id || 0}-fontFamily`);
    const initialLocalStorageFontFamilyValue = localStorageFontFamily === null ? [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',') : localStorageFontFamily;
    const localStorageTopColor = localStorage.getItem(`${me?.user?.user_id || 0}-topColor`);
    const initialLocalStorageTopColorValue = localStorageTopColor === null ?  "#3c4d67" : localStorageTopColor;
    const [fontSize, setFontSize] = React.useState(initialLocalStorageFontSizeValue);
    const [fontFamily, setFontFamily] = React.useState(initialLocalStorageFontFamilyValue);
    const [topColor, setTopColor] = React.useState(initialLocalStorageTopColorValue);

    const initialShowMediaValue = useMythicSetting({setting_name: "showMedia", default_value: "true"});
    const [showMedia, setShowMedia] = React.useState(initialShowMediaValue);

    const initialHideUsernameValue = useMythicSetting({setting_name: "hideUsernames", default_value: "false"});
    const [hideUsernames, setHideUsernames] = React.useState(initialHideUsernameValue);

    const initialShowIPValue = useMythicSetting({setting_name: "showIP", default_value: "false"});
    const [showIP, setShowIP] = React.useState(initialShowIPValue);

    const initialShowHostnameValue = useMythicSetting({setting_name: "showHostname", default_value: "false"});
    const [showHostname, setShowHostname] = React.useState(initialShowHostnameValue);

    const initialShowCallbackGroupsValue = useMythicSetting({setting_name: "showCallbackGroups", default_value: "false"});
    const [showCallbackGroups, setShowCallbackGroups] = React.useState(initialShowCallbackGroupsValue);

    const initialUseDisplayParamsForCLIHistory = useMythicSetting({setting_name: "useDisplayParamsForCLIHistory", default_value: "true"});
    const [useDisplayParamsForCLIHistory, setUseDisplayParamsForCLIHistory] = React.useState(initialUseDisplayParamsForCLIHistory);

    const [resumeNotifications, setResumeNotifications] = React.useState(false);
    const onChangeFontSize = (name, value, error) => {
      setFontSize(value);
    }
    const onChangeFontFamily = (name, value, error) => {
      setFontFamily(value);
    }
    const onHideUsernamesChanged = (evt) => {
      setHideUsernames(!hideUsernames);
    }
    const onShowIPChanged = (evt) => {
        setShowIP(!showIP);
    }
    const onShowHostnameChanged = (evt) => {
        setShowHostname(!showHostname);
    }
    const onShowCallbackGroupsChanged = (evt) => {
        setShowCallbackGroups(!showCallbackGroups);
    }
    const onShowMediaChanged = (evt) => {
        setShowMedia(!showMedia);
    }
    const onResumeNotifications = (evt) => {
        setResumeNotifications(!resumeNotifications);
    }
    const onChangeInteractType = (evt) => {
        setInteractType(evt.target.value);
    }
    const onChangeUseDisplayParamsForCLIHistory = (evt) => {
        setUseDisplayParamsForCLIHistory(!useDisplayParamsForCLIHistory);
    }
    const onAccept = () => {
      if(resumeNotifications){
          localStorage.setItem("dnd", JSON.stringify({
              "doNotDisturb": false,
              "doNotDisturbTimeStart": new Date(),
              "doNotDisturbMinutes": 0
          }))
      }
        localStorage.setItem(`${me?.user?.user_id || 0}-hideUsernames`, hideUsernames);
        localStorage.setItem(`${me?.user?.user_id || 0}-showIP`, showIP);
        localStorage.setItem(`${me?.user?.user_id || 0}-showHostname`, showHostname);
        localStorage.setItem(`${me?.user?.user_id || 0}-showCallbackGroups`, showCallbackGroups);
        localStorage.setItem(`${me?.user?.user_id || 0}-fontSize`, fontSize);
        localStorage.setItem(`${me?.user?.user_id || 0}-fontFamily`, fontFamily);
        localStorage.setItem(`${me?.user?.user_id || 0}-topColor`, topColor);
        localStorage.setItem(`${me?.user?.user_id || 0}-showMedia`, showMedia);
        localStorage.setItem(`${me?.user?.user_id || 0}-interactType`, interactType);
        SetMythicSetting({setting_name: "useDisplayParamsForCLIHistory", value: useDisplayParamsForCLIHistory});
        window.location.reload();
      props.onClose();
    }
    const setDefaults = () => {
      setFontSize(12);
      setFontFamily([
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','));
      setTopColor( "#3c4d67");
      setHideUsernames(false);
      setShowIP(false);
      setShowHostname(false);
      setShowCallbackGroups(false);
      setShowMedia(true);
      setInteractType("interact");
    }
  
  return (
    <React.Fragment>
        <DialogTitle id="form-dialog-title">Configure UI Settings</DialogTitle>
          <TableContainer className="mythicElement">
          <Table size="small" style={{ "maxWidth": "100%", "overflow": "scroll"}}>
              <TableBody>
                <TableRow hover>
                  <MythicStyledTableCell style={{width: "30%"}}>Font Size</MythicStyledTableCell>
                  <MythicStyledTableCell>
                    <MythicTextField type="number" value={fontSize} onChange={onChangeFontSize} showLabel={false} />
                  </MythicStyledTableCell>
                </TableRow>
                <TableRow hover>
                  <MythicStyledTableCell>Font Family</MythicStyledTableCell>
                  <MythicStyledTableCell>
                    <MythicTextField value={fontFamily} onChange={onChangeFontFamily} showLabel={false} multiline maxRows={5} />
                  </MythicStyledTableCell>
                </TableRow>
                <TableRow hover>
                  <MythicStyledTableCell>Hide Usernames In Tasking</MythicStyledTableCell>
                  <MythicStyledTableCell>
                    <Switch
                      checked={hideUsernames}
                      onChange={onHideUsernamesChanged}
                      color="info"
                      inputProps={{ 'aria-label': 'info checkbox' }}
                      name="hide_usernames"
                    />
                  </MythicStyledTableCell>
                </TableRow>
                  <TableRow hover>
                      <MythicStyledTableCell>Show Callback IP In Tasking</MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Switch
                              checked={showIP}
                              onChange={onShowIPChanged}
                              color="info"
                              inputProps={{ 'aria-label': 'info checkbox' }}
                              name="show_ip"
                          />
                      </MythicStyledTableCell>
                  </TableRow>
                  <TableRow hover>
                      <MythicStyledTableCell>Show Callback Hostname In Tasking</MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Switch
                              checked={showHostname}
                              onChange={onShowHostnameChanged}
                              color="info"
                              inputProps={{ 'aria-label': 'info checkbox' }}
                              name="show_hostname"
                          />
                      </MythicStyledTableCell>
                  </TableRow>
                  <TableRow hover>
                      <MythicStyledTableCell>Show Callback Groups In Tasking</MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Switch
                              checked={showCallbackGroups}
                              onChange={onShowCallbackGroupsChanged}
                              color="info"
                              inputProps={{ 'aria-label': 'info checkbox' }}
                              name="show_callback_groups"
                          />
                      </MythicStyledTableCell>
                  </TableRow>
                  <TableRow hover>
                      <MythicStyledTableCell>Automatically show Media in Browser scripts</MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Switch
                              checked={showMedia}
                              onChange={onShowMediaChanged}
                              color="info"
                              inputProps={{ 'aria-label': 'info checkbox' }}
                              name="show_media"
                          />
                      </MythicStyledTableCell>
                  </TableRow>
                <TableRow hover>
                      <MythicStyledTableCell>Resume Info/Warning Notifications</MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Switch
                              checked={resumeNotifications}
                              onChange={onResumeNotifications}
                              color="info"
                              inputProps={{ 'aria-label': 'info checkbox' }}
                              name="resumeNotifications"
                          />
                      </MythicStyledTableCell>
                  </TableRow>
                  <TableRow hover>
                      <MythicStyledTableCell>Show Display Parameters in CLI History</MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Switch
                              checked={useDisplayParamsForCLIHistory}
                              onChange={onChangeUseDisplayParamsForCLIHistory}
                              color="info"
                              inputProps={{ 'aria-label': 'info checkbox' }}
                              name="use display params"
                          />
                      </MythicStyledTableCell>
                  </TableRow>
                  <TableRow>
                      <MythicStyledTableCell>
                          Choose default type of tasking display
                      </MythicStyledTableCell>
                      <MythicStyledTableCell>
                          <Select
                              labelId="demo-dialog-select-label"
                              id="demo-dialog-select"
                              value={interactType}
                              onChange={onChangeInteractType}
                              input={<Input style={{width: "100%"}}/>}
                          >
                              {interactTypeOptions.map( (opt) => (
                                  <MenuItem value={opt.value} key={opt.value}>{opt.display}</MenuItem>
                              ) )}
                          </Select>
                      </MythicStyledTableCell>
                  </TableRow>
                <TableRow hover>
                  <MythicStyledTableCell>Top App Bar Color</MythicStyledTableCell>
                  <MythicStyledTableCell>
                    <HexColorPicker color={topColor} onChange={setTopColor} />
                    <HexColorInput color={topColor} onChange={setTopColor} />
                    <Box sx={{width: "100%", height: 25, backgroundColor: topColor}} >
                        <Typography style={{color: "white"}}>Operation Chimera Sample</Typography>
                    </Box>
                  </MythicStyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
        </TableContainer>
        <DialogActions>
          <Button onClick={props.onClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={setDefaults} variant="contained" color="info">
            Reset Defaults
          </Button>
          <Button onClick={onAccept} variant="contained" color="success">
            Update
          </Button>
        </DialogActions>
  </React.Fragment>
  );
}

