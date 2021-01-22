#!/bin/sh

NEW_TAG=$1

PREVIOUS_TAG=$(git tag --sort=-creatordate | sed -n 2p)
COMMIT_SUMMARY="$(git log --oneline --pretty=tformat:"%h %s" $PREVIOUS_TAG..$NEW_TAG)"
COMMIT_SUMMARY="${COMMIT_SUMMARY//$'\n'/'%0A'}"
echo ::set-output name=COMMIT_SUMMARY::$COMMIT_SUMMARY