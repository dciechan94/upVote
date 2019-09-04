package pl.krakow.up.vote.api.model.converter;

import pl.krakow.up.vote.api.model.*;
import pl.krakow.up.vote.model.*;

public interface Converter {

    Vote toModelObject(VoteDTO apiVoteDto);

    VoteDTO toApiObject(Vote modelVote);

    Role toModelObject(RoleDTO apiRoleDto);

    RoleDTO toApiObject(Role modelRole);

    User toModelObject(UserDTO apiUserDto);

    UserDTO toApiObject(User modelUser);

    VotePoll toModelObject(VotePollDTO apiVotePollDto);

    VotePollDTO toApiObject(VotePoll modelVotePoll);

    RegistrationCode toModelObject(RegistrationCodeDTO apiRegistrationCodeDto);

    RegistrationCodeDTO toApiObject(RegistrationCode modelRegistrationCode);
}
