import "./list.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import skillService from "../../services/skillService"
import { skillColumn } from "../../datatablesource"
import DatatableTemplate from "../../components/datatableTemplate/DatatableTemplate"
import ExtraInfoDatatable from "../../components/ExtraInfoDatatable/ExtraInfoDatatable"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { skillActionColumn } from "../../columnAction";
import { useEffect } from "react"


const Skills = () => {

  const {data: skills, error, isError, isLoading } = useQuery({queryKey: ['skills'], queryFn: skillService.getAllSkill}) 
  useEffect(()=>{
    if(isError)
    {
      navigate('/login')
      window.alert("Session has expired")
      localStorage.clear()
    }
  }, [isError])
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
            <ExtraInfoDatatable dataRows={skills?.data?.data} columns={skillColumn} deleteMutation={deleteSkillMutation}
                                actionColumn={skillActionColumn}/>
      </div>}
    </>

  )
}

export default Skills