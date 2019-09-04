package pl.krakow.up.vote.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import pl.krakow.up.vote.api.model.annotations.BGField;
import pl.krakow.up.vote.api.model.annotations.Mode;

import java.net.URI;
import java.util.Date;

@Getter
@Setter
public abstract class CoreObject {

    @BGField(name = "id", mode = Mode.VIEW, type = Long.class)
    Long id;

    @JsonIgnore
    @Setter(AccessLevel.NONE)
    ObjectType objectType;

    @Setter(AccessLevel.NONE)
    String type;

    @BGField(name = "created", mode = Mode.VIEW, type = Date.class)
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    Date created;

    @BGField(name = "creator", mode = Mode.VIEW, type = String.class)
    String creator;

    @BGField(name = "modified", mode = Mode.VIEW, type = Date.class)
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    Date modified;

    @BGField(name = "modifier", mode = Mode.VIEW, type = String.class)
    String modifier;

    @JsonIgnore
    URI uri;

    public CoreObject(ObjectType objectType) {
        this.objectType = objectType;
        this.type = this.objectType.getName();
    }

    public Date getCreated() {
        if (created != null) {
            return new Date(this.created.getTime());
        }
        return null;
    }

    public Date getModified() {
        if (modified != null) {
            return new Date(this.modified.getTime());
        }
        return null;
    }

    public void setCreated(Date created) {
        if (created != null) {
            this.created = new Date(created.getTime());
        } else {
            this.created = null;
        }
    }

    public void setModified(Date modified) {
        if (modified != null) {
            this.modified = new Date(modified.getTime());
        } else {
            this.modified = null;
        }
    }


}