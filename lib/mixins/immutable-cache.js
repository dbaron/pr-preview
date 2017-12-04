"use strict";

const cache = require("../cache");

module.exports = (superclass) => class extends superclass {
    get key() {
        let k;
        if (this.aws_s3_bucket == "whatpr.org") {
            // repo/pull/45/7dfd134.html
            // repo/pull/45/7dfd134/foo.html
            k = `${ this.repo }/${ this.pr.number }/${ this.short_sha }`;
        } else {
            // owner/repo/pull/45/7dfd134.html
            // owner/repo/pull/45/7dfd134/foo.html
            k = `${ this.owner }/${ this.repo }/pull/${ this.pr.number }/${ this.short_sha }`;
        }
        return this.filename ? `${ k }/${ this.filename }` : `${ k }.html`;
    }

    get cache_url() {
        return cache.getUrl(this.aws_s3_bucket, this.key);
    }

    cache() {
        return cache.immutable(this.aws_s3_bucket, this.key, _ => this.fetch());
    }
};