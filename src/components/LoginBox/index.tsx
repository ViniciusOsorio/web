import styles from './styles.module.scss';
import { VscGithubInverted} from 'react-icons/vsc';
import { useEffect } from 'react';
import { api } from '../../services/api';

type AuthResponse = {
    token: string,
    user: {
        id: string,
        avatar_url: string,
        name: string,
        login: string,
    },
}

export function LoginBox() {

    const signedInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=4eac739412f1daa883f9`;

    async function signIn(githubCode: string){
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        });

        const { token, user } = response.data;

        localStorage.setItem('@dowhile: token', token);

        console.log(user);
    }

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            console.log({ urlWithoutCode, githubCode});

            window.history.pushState({}, '', urlWithoutCode);

            signIn(githubCode);

        }
    }, []);

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem!</strong>
            <a href={signedInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size="24"/>
                Entrar com Github
            </a>
        </div>
    )
}