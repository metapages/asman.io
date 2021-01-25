---
apiVersion: batch/v1
kind: Job
metadata:
  name: pg-hasura-user
spec:
  template:
    spec:
      restartPolicy: OnFailure
      volumes:
      - name: pg-hasura-user-volume
        configMap:
          name: pg-hasura-user-script
          defaultMode: 0755
      containers:
      - name: pg-hasura-user
        image: postgres
        command:
        - /bin/sh
        - -c
        - |
          /tmp/pg-hasura-user.sh
        volumeMounts:
          - name: pg-hasura-user-volume
            mountPath: /tmp/pg-hasura-user.sh
            subPath: pg-hasura-user.sh
        env:
        - name: PGHOST
          valueFrom:
            secretKeyRef:
              name: ${hasura_user_secret}
              key: PGHOST
        - name: PGUSER
          valueFrom:
            secretKeyRef:
              name: ${hasura_user_secret}
              key: PGUSER
        - name: PGDATABASE
          valueFrom:
            secretKeyRef:
              name: ${hasura_user_secret}
              key: PGDATABASE
        - name: PGPASSWORD
          valueFrom:
            secretKeyRef:
              name: ${hasura_user_secret}
              key: PGPASSWORD
        - name: ADMIN_USER_PW
          valueFrom:
            secretKeyRef:
              name: ${hasura_user_secret}
              key: ADMIN_USER_PW
      tolerations:
      - key: "ops-node"
        operator: "Equal"
        value: "true"
        effect: "NoExecute"
      nodeSelector:
        ops-node: "true"
