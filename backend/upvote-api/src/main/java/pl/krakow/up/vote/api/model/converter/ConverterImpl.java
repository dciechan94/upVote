package pl.krakow.up.vote.api.model.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.krakow.up.vote.api.model.*;
import pl.krakow.up.vote.model.*;

import java.util.HashMap;
import java.util.Map;


@Component
public class ConverterImpl implements Converter, GenericConverter {

    @Autowired
    private ApiRoleConverter roleConverter;

    @Autowired
    private ApiVoteConverter voteConverter;

    @Autowired
    private ApiVotePollConverter votePollConverter;

    @Autowired
    private ApiRegistrationCodeConverter registrationCodeConverter;

    @Autowired
    private ApiUserConverter userConverter;


    @Override
    public Vote toModelObject(VoteDTO apiVoteDto) {
        return (Vote) toModelObject((CoreObject) apiVoteDto);
    }

    @Override
    public VoteDTO toApiObject(Vote modelVote) {
        return (VoteDTO) toApiObject((AbstractObject) modelVote);
    }

    @Override
    public Role toModelObject(RoleDTO apiRoleDto) {
        return (Role) toModelObject((CoreObject) apiRoleDto);
    }

    @Override
    public RoleDTO toApiObject(Role modelRole) {
        return (RoleDTO) toApiObject((AbstractObject) modelRole);
    }

    @Override
    public VotePoll toModelObject(VotePollDTO apiVotePollDto) {
        return (VotePoll) toModelObject((CoreObject) apiVotePollDto);
    }

    @Override
    public VotePollDTO toApiObject(VotePoll modelVotePoll) {
        return (VotePollDTO) toApiObject((AbstractObject) modelVotePoll);
    }

    @Override
    public RegistrationCode toModelObject(RegistrationCodeDTO apiRegistrationCodeDto) {
        return (RegistrationCode) toModelObject((CoreObject) apiRegistrationCodeDto);
    }

    @Override
    public RegistrationCodeDTO toApiObject(RegistrationCode modelRegistrationCode) {
        return (RegistrationCodeDTO) toApiObject((AbstractObject) modelRegistrationCode);
    }

    @Override
    public User toModelObject(UserDTO apiUserDto) {
        return (User) toModelObject((CoreObject) apiUserDto);
    }

    @Override
    public UserDTO toApiObject(User modelUser) {
        return (UserDTO) toApiObject((AbstractObject) modelUser);
    }

    @Override
    public AbstractObject toModelObject(CoreObject apiObject,
                                        Map<Long, AbstractObject> internalModelCache) {
        AbstractObject obj2return = null;
        if (internalModelCache.get(apiObject.getId()) != null) {
            obj2return = internalModelCache.get(apiObject.getId());
        } else {
            if (apiObject instanceof UserDTO) {
                obj2return = userConverter.toModelObject((UserDTO) apiObject, internalModelCache);
            } else if (apiObject instanceof RoleDTO) {
                obj2return = roleConverter.toModelObject((RoleDTO) apiObject, internalModelCache);
            } else if (apiObject instanceof RegistrationCodeDTO) {
                obj2return = registrationCodeConverter.toModelObject((RegistrationCodeDTO) apiObject, internalModelCache);
            } else if (apiObject instanceof VoteDTO) {
                obj2return = voteConverter.toModelObject((VoteDTO) apiObject, internalModelCache);
            } else if (apiObject instanceof VotePollDTO) {
                obj2return = votePollConverter.toModelObject((VotePollDTO) apiObject, internalModelCache);
            }
            if (obj2return != null) {
                internalModelCache.put(obj2return.getId(), obj2return);
            }
        }
        return obj2return;
    }

    @Override
    public CoreObject toApiObject(AbstractObject modelObject, Map<Long, CoreObject> internalApiCache) {
        CoreObject obj2return = null;
        if (internalApiCache.get(modelObject.getId()) != null) {
            obj2return = internalApiCache.get(modelObject.getId());
        } else {
            if (modelObject instanceof User) {
                obj2return = userConverter.toApiObject((User) modelObject, internalApiCache);
            } else if (modelObject instanceof Role) {
                obj2return = roleConverter.toApiObject((Role) modelObject, internalApiCache);
            } else if (modelObject instanceof Vote) {
                obj2return = voteConverter.toApiObject((Vote) modelObject,
                        internalApiCache);
            } else if (modelObject instanceof VotePoll) {
                obj2return = votePollConverter.toApiObject((VotePoll) modelObject,
                        internalApiCache);
            } else if (modelObject instanceof RegistrationCode) {
                obj2return = registrationCodeConverter.toApiObject((RegistrationCode) modelObject,
                        internalApiCache);
            }
            if (obj2return != null) {
                internalApiCache.put(obj2return.getId(), obj2return);
            }
        }
        return obj2return;
    }

    private AbstractObject toModelObject(CoreObject apiObject) {
        return toModelObject(apiObject, new HashMap<>());
    }

    private CoreObject toApiObject(AbstractObject modelObject) {
        return toApiObject(modelObject, new HashMap<>());
    }
}
