import "./list.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import skillService from "../../services/skillService"
import { skillColumn } from "../../datatablesource"
import DatatableTemplate from "../../components/datatableTemplate/DatatableTemplate"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { skillActionColumn } from "../../columnAction"

const Skills = () => {

  const {data: skills, error, isError, isLoading } = useQuery({queryKey: ['skills'], queryFn: skillService.getAllSkill}) 
  const deleteSkillMutation = useMutation({mutationFn: (id)=> skillService.deleteSkill(id), mutationKey: 'delete-skill'})
  return (
    <>

    {
      isLoading ?
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>
        <CircularProgress />
     </Box>
      :
      <div className="listContainer">
            <DatatableTemplate dataRows={skills?.data?.data} columns={skillColumn} deleteMutation={deleteSkillMutation}
                                actionColumn={skillActionColumn}/>
      </div>}
    </>

  )
}

export default Skills