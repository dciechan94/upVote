package pl.krakow.up.upvote.rest.v1.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VotePollDTO {

    private Long id;
    private String name;
    private String shortDescription;
    private String longDescription;

    private UserDTO createdBy;

    private List<VoteableDTO> votables;
    private List<UserDTO> invited;

    private Long createDate;
    private Long announceDate;
    private Long voteStartDate;
    private Long voteEndDate;
    private Long publishResultDate;

    private Map<String, Object> metadata;
    private Map<String, Object> restults;


    public VotePollDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public List<VoteableDTO> getVotables() {
        return votables;
    }

    public void setVotables(List<VoteableDTO> votables) {
        this.votables = votables;
    }

    public Long getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Long createDate) {
        this.createDate = createDate;
    }

    public Long getAnnounceDate() {
        return announceDate;
    }

    public void setAnnounceDate(Long announceDate) {
        this.announceDate = announceDate;
    }

    public Long getVoteStartDate() {
        return voteStartDate;
    }

    public void setVoteStartDate(Long voteStartDate) {
        this.voteStartDate = voteStartDate;
    }

    public Long getVoteEndDate() {
        return voteEndDate;
    }

    public void setVoteEndDate(Long voteEndDate) {
        this.voteEndDate = voteEndDate;
    }

    public Long getPublishResultDate() {
        return publishResultDate;
    }

    public void setPublishResultDate(Long publishResultDate) {
        this.publishResultDate = publishResultDate;
    }

    public UserDTO getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserDTO createdBy) {
        this.createdBy = createdBy;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public Map<String, Object> getRestults() {
        return restults;
    }

    public void setRestults(Map<String, Object> restults) {
        this.restults = restults;
    }

    public List<UserDTO> getInvited() {
        return invited;
    }

    public void setInvited(List<UserDTO> invited) {
        this.invited = invited;
    }
}
