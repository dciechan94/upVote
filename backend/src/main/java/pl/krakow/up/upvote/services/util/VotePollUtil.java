package pl.krakow.up.upvote.services.util;

import pl.krakow.up.upvote.core.model.VotePoll;

public class VotePollUtil {

    public static final long POLL_STILL_ACTUAL_TIME_GAP = 1000 * 60 * 60 * 24 * 14; // 14 days

    public static boolean isVotePollAnnounced(VotePoll votePoll) {
        return System.currentTimeMillis() >= votePoll.getAnnounceDate().getTime();
    }

    public static boolean isVotePollActual(VotePoll votePoll) {
        long voteGetsArchivedOn = votePoll.getPublishResultDate().getTime() + POLL_STILL_ACTUAL_TIME_GAP;
        return System.currentTimeMillis() <= voteGetsArchivedOn;
    }

    public static boolean isVotePollArchived(VotePoll votePoll) {
        return !isVotePollActual(votePoll);
    }

    public static boolean isVotePublished(VotePoll votePoll) {
        return System.currentTimeMillis() >= votePoll.getPublishResultDate().getTime();
    }

    public static boolean isDuringVotingPhase(VotePoll votePoll) {
        long now = System.currentTimeMillis();
        return now >= votePoll.getVoteStartDate().getTime() &&
                now < votePoll.getVoteEndDate().getTime();
    }
}
