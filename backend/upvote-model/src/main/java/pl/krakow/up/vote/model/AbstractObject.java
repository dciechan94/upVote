package pl.krakow.up.vote.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractObject {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence")
    @SequenceGenerator(name = "sequence", allocationSize = 100)
    private Long id;

    @CreatedDate
    private Date created;

    @LastModifiedDate
    private Date modified;

    @CreatedBy
    private String creator;

    @LastModifiedBy
    private String modifier;

    public Date getCreated() {
        if (this.created != null) {
            return new Date(this.created.getTime());
        }
        return null;
    }

    public Date getModified() {
        if (this.modified != null) {
            return new Date(this.modified.getTime());
        }
        return null;
    }
}
