package pl.krakow.up.upvote.rest.v1.model.dto;

import java.util.List;

public class VotePollDTO {

    private Long id;
    private String name;
    private String shortDescription;
    private String longDescription;

    private Long creationDate;
    private List<VoteOptionDTO> options;

    private Long publishDate;
    private Long startVotingDate;
    private Long finishVotingDate;
    private Long resultDate;


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

    public Long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Long creationDate) {
        this.creationDate = creationDate;
    }

    public Long getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Long publishDate) {
        this.publishDate = publishDate;
    }

    public Long getStartVotingDate() {
        return startVotingDate;
    }

    public void setStartVotingDate(Long startVotingDate) {
        this.startVotingDate = startVotingDate;
    }

    public Long getFinishVotingDate() {
        return finishVotingDate;
    }

    public void setFinishVotingDate(Long finishVotingDate) {
        this.finishVotingDate = finishVotingDate;
    }

    public Long getResultDate() {
        return resultDate;
    }

    public void setResultDate(Long resultDate) {
        this.resultDate = resultDate;
    }

    public List<VoteOptionDTO> getOptions() {
        return options;
    }

    public void setOptions(List<VoteOptionDTO> options) {
        this.options = options;
    }
}
