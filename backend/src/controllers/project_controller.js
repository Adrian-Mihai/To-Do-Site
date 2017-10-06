const knex = require('../../database/database');
const usefulFunction = require('../method/function');

const projectController = {};

projectController.addProject = (req, res) => {
  const projectData = req.body;
  projectData.project_status = 'In work';
  projectData.project_point = 0;
  projectData.project_user_vote = projectData.user_id;
  if(usefulFunction.checkNull(projectData)){
   	return res.status(400).send('Fields cannot be null');
  }else{
  	knex('projects')
  	.first('*')
    .where('user_id', projectData.user_id)
  	.andWhere('project_title', projectData.project_title)
  	.then(response =>{
  		if(response){
  			return res.status(400).send('Project already exist');
  		}else{
  			knex('projects')
        .insert(projectData)
        .then(() =>{
          return res.status(200).send('Success');
        }).catch(err =>{
          console.log(err.message);
          return res.status(500).send('DB error');
        })
  		}
  	}).catch(err =>{
      console.log(err.message);
      return res.status(500).send('DB error');
    })
  }
};

projectController.voteProject = (req, res) =>{
  const project = req.body;
  const projectId = req.params.id;
  knex('projects')
    .where('id', projectId)
    .update({
      project_point: project.points,
      project_user_vote: project.users.toString(),
    }).then(() =>{
      return res.status(200).send('Success');
    }).catch(err =>{
      console.log(err.message);
      return res.status(400).send(err.message);
    })
};

projectController.getAll = (req, res) =>{
  const userId = req.params.id;
  knex('projects')
    .select('*')
    .where('user_id', userId)
    .then( response =>{
      return res.status(200).send(response);
    }).catch( error =>{
      console.log(error.message);
      return res.status(500).send(error.message);
    })
};

projectController.getById = (req, res) =>{
  const id = req.params.id;
  knex('projects')
    .first('*')
    .where('id', id)
    .then(response =>{
      return res.status(200).send(response);
    }).catch(err =>{
      console.log(err.message);
      return res.status(500).send(error);
    })
};

projectController.editProject = (req, res) =>{
  const id = req.params.id;
  const data = req.body;
  knex('projects')
    .where('id', id)
    .update(data)
    .then(() =>{
      return res.status(200).send('Success');
    }).catch(err =>{
      console.log(err.message);
      return res.status(500).send(err.message);
    })
}

projectController.deleteProject = (req, res) =>{
  const id = req.params.id;
  knex('projects')
    .where('id', id)
    .del()
    .then(() =>{
      return res.status(200).send('Success');    
    }).catch(err =>{
      console.log(err.message);
      return res.status(500).send(err);
    })
};

module.exports = projectController;