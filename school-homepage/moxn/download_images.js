import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

// 确保 images 目录存在
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// 定义要下载的图片列表
const images = [
    // 学校介绍图片
    {
        url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
        filename: 'about_intro.jpg',
        description: '学校建筑'
    },
    
    // 领导团队头像（4张）
    {
        url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        filename: 'team_leader_1.jpg',
        description: '领导头像1'
    },
    {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        filename: 'team_leader_2.jpg',
        description: '领导头像2'
    },
    {
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        filename: 'team_leader_3.jpg',
        description: '领导头像3'
    },
    {
        url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        filename: 'team_leader_4.jpg',
        description: '领导头像4'
    },
    
    // 教授师资头像（4张）
    {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        filename: 'professor_1.jpg',
        description: '教授头像1'
    },
    {
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        filename: 'professor_2.jpg',
        description: '教授头像2'
    },
    {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        filename: 'professor_3.jpg',
        description: '教授头像3'
    },
    {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
        filename: 'professor_4.jpg',
        description: '教授头像4'
    },
    
    // 教学资源图片（4张）
    {
        url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
        filename: 'resource_lab.jpg',
        description: '实验室'
    },
    {
        url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
        filename: 'resource_library.jpg',
        description: '图书馆'
    },
    {
        url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
        filename: 'resource_online.jpg',
        description: '在线学习'
    },
    {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
        filename: 'resource_maker.jpg',
        description: '创客空间'
    },
    
    // 地图背景图片
    {
        url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
        filename: 'contact_map.jpg',
        description: '地图背景'
    }
];

// 下载单个图片的函数
function downloadImage(url, filepath, description) {
    return new Promise((resolve, reject) => {
        console.log(`正在下载: ${description}...`);
        
        const file = fs.createWriteStream(filepath);
        
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`下载失败: ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                console.log(`✓ 完成: ${description}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // 删除不完整的文件
            reject(err);
        });
    });
}

// 主函数 - 依次下载所有图片
async function main() {
    console.log('========================================');
    console.log('开始从 Unsplash 下载图片');
    console.log('========================================\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const image of images) {
        const filepath = path.join(imagesDir, image.filename);
        
        try {
            await downloadImage(image.url, filepath, image.description);
            successCount++;
        } catch (error) {
            console.error(`✗ 失败: ${image.description} - ${error.message}`);
            failCount++;
        }
        
        // 添加小延迟，避免请求过快
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n========================================');
    console.log(`下载完成！成功: ${successCount}, 失败: ${failCount}`);
    console.log('========================================');
}

main().catch(console.error);
