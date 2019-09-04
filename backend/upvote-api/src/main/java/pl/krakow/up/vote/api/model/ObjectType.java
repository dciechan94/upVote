package pl.krakow.up.vote.api.model;

public enum ObjectType {

    role(Constants.ROLE),
    vote(Constants.VOTE),
    vote_option(Constants.VOTE_OPTION),
    vote_poll(Constants.VOTE_POLL),
    registration_code(Constants.REGISTRATION_CODE),
    user(Constants.USER);

    public static class Constants {
        public static final String ROLE = "role";
        public static final String VOTE = "vote";
        public static final String VOTE_OPTION = "vote_option";
        public static final String USER = "user";
        public static final String VOTE_POLL = "vote_poll";
        public static final String REGISTRATION_CODE = "registration_code";
    }

    private String name;

    ObjectType(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    };
}
