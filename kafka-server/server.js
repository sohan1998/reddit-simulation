const connection = new require('./kafka/Connection');
const mongoose = require('./services/mongoose');
const createCommunity = require('./services/CreateCommunity');
const searchCommunity = require('./services/SearchCommunity');
const addMessages = require('./services/AddMessages');
const getMessages = require('./services/GetMessages');
const addPost = require('./services/AddPost');
const getPost = require('./services/GetPost');
const requestToJoinCommunity = require('./services/RequestToJoinCommunity');
const inviteToJoinCommunity = require('./services/InviteToJoinCommunity');
const acceptInvitationByUser = require('./services/AcceptInvitationByUser.js');
const getCommunity = require('./services/GetCommunity');
const getProfile = require('./services/GetProfile');
const updateProfile = require('./services/UpdateProfile');
const imageUpload = require('./services/UploadImage');
const approverequesttojoincommunity = require('./services/ApproveRequestToJoinCommunity');
const checkapprovedstatus = require('./services/CheckApprovedStatus');
const votingforcommunity = require('./services/VotingForCommunity');
const communitiesListByUser = require('./services/CommunitiesListByUser');
const RequestedUsersList = require('./services/RequestedUsersList');
const ListOfUserJoinedCommunityCreatedByUser = require('./services/ListOfUserJoinedCommunityCreatedByUser');
const usersearch = require('./services/UserSearch');
const addcomment = require('./services/AddComment');
const getcomment = require('./services/GetComments');
const getpostbyid = require('./services/GetPostById');
const getusercommunities = require('./services/GetUserCommunities');
const votingforpost = require('./services/VotingForPost');
const leavecommunity = require('./services/LeaveCommunity');
const votingforcomment = require('./services/VotingForComment');
const deletecommunity = require('./services/DeleteCommunity');
const communityimages = require('./services/MultiImgCommunity');
const noofmembers = require('./services/NoOfMembers');
const mostupvotedpost = require('./services/MostUpvotedPost');
const noofposts = require('./services/NoOfPosts');
const usermaxpost = require('./services/UserMaxPost');
const getinvitations = require('./services/GetInvitations');
const maxpostcommunity = require('./services/MaxPostCommunity');
const maxpostuser = require('./services/MaxPostUser');
const addpostimage = require('./services/AddPostImage');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + ' ', fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res,
                    }),
                    partition: 0,
                },
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });
    });
}
